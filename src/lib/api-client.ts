import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface FetchOptions extends RequestInit {
    skipToast?: boolean;
}

export function setApiToken(token: string) {
    if (typeof window !== 'undefined') {
        if (token) {
            localStorage.setItem('storefront_token', token);
        } else {
            localStorage.removeItem('storefront_token');
        }
    }
}

export function logout() {
    if (typeof window !== 'undefined') {
        // Clear auth token
        localStorage.removeItem('storefront_token');

        // Clear all cart-related keys
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cart_')) {
                localStorage.removeItem(key);
            }
        });

        // Clear other known keys
        localStorage.removeItem('affiliate_brand_id');
        localStorage.removeItem('selected_brand_id');
        localStorage.removeItem('brand_onboarding_step');

        // Clear session storage
        sessionStorage.clear();
    }
}

const pendingRequests = new Map<string, Promise<any>>();

export async function fetchApi<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const isGet = !options.method || options.method.toUpperCase() === 'GET';
    const cacheKey = isGet ? `${endpoint}` : null;

    if (isGet && cacheKey && pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey);
    }

    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    // Add JWT token if exists
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('storefront_token');
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    const executeRequest = async (): Promise<T> => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include',
            });

            if (!response.ok) {
                // If 401, redirect to appropriate login page, but NOT for auth endpoints themselves
                const isAuthEndpoint = endpoint.includes('/auth/');
                if (response.status === 401 && typeof window !== 'undefined' && !isAuthEndpoint) {
                    const isAffiliatePath = window.location.pathname.startsWith('/affiliate');
                    let targetPath = isAffiliatePath ? '/affiliate/login' : '/login';

                    // For storefront (non-affiliate) paths, try to keep the brand slug
                    if (!isAffiliatePath) {
                        const pathParts = window.location.pathname.split('/').filter(Boolean);
                        if (pathParts.length > 0 && pathParts[0] !== 'login' && pathParts[0] !== 'register') {
                            targetPath = `/${pathParts[0]}/login`;
                        }
                    }

                    if (window.location.pathname !== targetPath) {
                        logout();
                        window.location.href = targetPath;
                    }
                    return new Promise(() => { });
                }

                const errText = await response.text();
                let error;
                try {
                    error = errText ? JSON.parse(errText) : { message: 'An unknown error occurred' };
                } catch {
                    error = { message: errText || 'An unknown error occurred' };
                }
                if (typeof window !== 'undefined' && !options.skipToast) {
                    const status = response.status;
                    const message = error.message || response.statusText;

                    switch (status) {
                        case 400:
                        case 422:
                            toast.error('Validation Error', { description: message });
                            break;
                        case 403:
                            toast.error('Permission Denied', { description: 'You do not have permission to perform this action.' });
                            break;
                        case 404:
                            toast.error('Not Found', { description: message });
                            break;
                        case 409:
                            toast.error('Conflict', { description: message });
                            break;
                        case 429:
                            toast.error('Too Many Requests', { description: 'Please slow down and try again later.' });
                            break;
                        case 500:
                            toast.error('Server Error', { description: 'Something went wrong on our end. Please try again later.' });
                            break;
                        default:
                            if (status >= 400) {
                                toast.error('Error', { description: message });
                            }
                    }
                }

                throw new Error(error.message || `API error: ${response.statusText}`);
            }

            if (response.status === 204) return {} as T;

            const text = await response.text();
            return text ? JSON.parse(text) : {} as T;
        } finally {
            if (isGet && cacheKey) {
                pendingRequests.delete(cacheKey);
            }
        }
    };

    const requestPromise = executeRequest();
    if (isGet && cacheKey) {
        pendingRequests.set(cacheKey, requestPromise);
    }

    return requestPromise;
}

export const adminApi = {
    getStats: async () => {
        const [overview, activity, top] = await Promise.all([
            fetchApi<any>('/admin/stats/overview'),
            fetchApi<any>('/admin/activity/recent?limit=5'),
            fetchApi<any[]>('/admin/brands/top?limit=5'),
        ]);

        return {
            totalBrands: Object.values(overview.brands || {}).reduce((a: any, b: any) => a + b, 0) as number,
            activePartners: (overview.partners?.ACTIVE || 0) as number,
            platformRevenue: `$${(overview.totalRevenue || 0).toLocaleString()}`,
            totalOrders: (overview.totalOrders || 0) as number,
            totalAffiliates: (overview.activeAffiliates || 0) as number,
            productsCount: (overview.labs || 0) as number,
            pendingCommissions: `$${(overview.pendingCommissions || 0).toLocaleString()}`,
            monthlyPayouts: `$${(overview.monthlyPayouts || 0).toLocaleString()}`,
            recentActivity: (activity.data || []).map((a: any) => ({
                type: a.type || 'info',
                msg: a.message || a.msg || 'System update',
                time: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'Just now',
                href: '/admin',
            })),
            topBrands: (top || []).map((t: any) => ({
                name: t.brand?.name || 'Untitled Brand',
                orders: t.orderCount || 0,
                revenue: `$${(t.revenue || 0).toLocaleString()}`,
                href: `/admin/brands`,
            })),
        };
    },

    getBrands: (filter?: string) =>
        fetchApi<any[]>(`/admin/brands${filter && filter !== 'all' ? `?status=${filter.toUpperCase()}` : ''}`),

    getBrand: (id: string) =>
        fetchApi<any>(`/admin/brands/${id}`),

    createBrand: (data: any) =>
        fetchApi('/admin/brands', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateBrand: (id: string, data: any) =>
        fetchApi(`/admin/brands/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    deleteBrand: (id: string) =>
        fetchApi(`/admin/brands/${id}`, {
            method: 'DELETE',
        }),

    getPartners: (filter?: string | { status?: string; search?: string }) => {
        const params = new URLSearchParams();
        if (typeof filter === 'string') {
            if (filter !== 'all') params.append('status', filter.toUpperCase());
        } else if (filter) {
            if (filter.status && filter.status !== 'all') params.append('status', filter.status.toUpperCase());
            if (filter.search && typeof filter.search === 'string') params.append('search', filter.search);
        }
        const query = params.toString();
        return fetchApi<any[]>(`/admin/partners${query ? `?${query}` : ''}`);
    },
    getPartnersList: () =>
        fetchApi<any[]>('/admin/partners/list'),

    createPartner: (data: any) =>
        fetchApi('/admin/partners', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updatePartner: (id: string, data: any) =>
        fetchApi(`/admin/partners/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    changePartnerStatus: (id: string, status: string, reason?: string) =>
        fetchApi(`/admin/partners/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, reason }),
        }),

    deletePartner: (id: string) =>
        fetchApi(`/admin/partners/${id}`, {
            method: 'DELETE',
        }),

    getOrders: (filter?: string | { status?: string; search?: string }) => {
        const params = new URLSearchParams();

        if (typeof filter === 'string') {
            if (filter !== 'all') params.append('status', filter.toUpperCase());
        } else if (filter) {
            if (filter.status && filter.status !== 'all') params.append('status', filter.status.toUpperCase());
            if (filter.search && typeof filter.search === 'string') params.append('search', filter.search);
        }

        const query = params.toString();
        return fetchApi<any[]>(`/admin/orders${query ? `?${query}` : ''}`);
    },

    getOrder: (id: string) =>
        fetchApi<any>(`/admin/orders/${id}`),

    getPayoutQueue: (filter?: any) => {
        const params = new URLSearchParams();
        if (filter?.recipientType) params.append('recipientType', filter.recipientType);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/admin/payouts/queue${query ? `?${query}` : ''}`);
    },

    getRecentPayouts: (filter?: any) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/admin/payouts/recent${query ? `?${query}` : ''}`);
    },

    getPayoutStats: () =>
        fetchApi<any>('/admin/stats/payouts'),

    approvePayout: (id: string) =>
        fetchApi(`/admin/payouts/${id}/approve`, { method: 'PATCH' }),

    processPayout: (id: string) =>
        fetchApi(`/admin/payouts/${id}/process`, { method: 'POST' }),

    approveAllPayouts: (maxAmount?: number) =>
        fetchApi(`/admin/payouts/approve-all${maxAmount ? `?maxAmount=${maxAmount}` : ''}`, { method: 'POST' }),

    processAllPayouts: () =>
        fetchApi('/admin/payouts/process-all', { method: 'POST' }),

    getCommissions: (filter?: any) => {
        const params = new URLSearchParams();
        if (filter?.status && filter.status !== 'all') params.append('status', filter.status.toUpperCase());
        if (filter?.recipientType) params.append('recipientType', filter.recipientType);
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());

        const query = params.toString();
        return fetchApi<any>(`/admin/commissions${query ? `?${query}` : ''}`);
    },

    getCommissionStats: () =>
        fetchApi<any>('/admin/stats/commissions'),

    getSettings: () =>
        fetchApi<any>('/admin/settings'),

    updateSettings: (settings: Record<string, any>) =>
        fetchApi('/admin/settings', {
            method: 'PUT',
            body: JSON.stringify({ settings }),
        }),

    updateFeatureFlags: (flags: Record<string, boolean>) =>
        fetchApi('/admin/settings/features', {
            method: 'PUT',
            body: JSON.stringify({ flags }),
        }),

    login: (data: any) =>
        fetchApi<{ accessToken: string; user: any }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    register: (data: any) =>
        fetchApi<{ accessToken: string; user: any }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    logout: () =>
        fetchApi('/auth/logout', { method: 'POST' }),

    getMe: () =>
        fetchApi<any>('/auth/me'),

    updateMe: (data: any) =>
        fetchApi<any>('/auth/me', {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
};

export const brandApi = {
    getProfile: () =>
        fetchApi<any>('/brand/me'),

    getStats: () =>
        fetchApi<any>('/brand/dashboard/stats'),

    getNavBadges: () =>
        fetchApi<any>('/brand/nav-badges'),

    getChecklist: () =>
        fetchApi<any>('/brand/onboarding/checklist'),

    updateChecklist: (step: number, completed: boolean) =>
        fetchApi('/brand/onboarding/checklist', {
            method: 'PATCH',
            body: JSON.stringify({ step, completed }),
        }),

    getOrders: (filter?: { status?: string; search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.status && filter.status !== 'all') params.append('status', filter.status.toUpperCase());
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/brand/orders${query ? `?${query}` : ''}`);
    },

    getOrder: (id: string) =>
        fetchApi<any>(`/brand/orders/${id}`),

    getProducts: (filter?: { status?: string; search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.status && filter.status !== 'all') params.append('status', filter.status.toUpperCase());
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/brand/products${query ? `?${query}` : ''}`);
    },

    getTopSeller: () =>
        fetchApi<any>('/brand/products/top-seller'),

    getAffiliates: (filter?: { search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/brand/affiliates${query ? `?${query}` : ''}`);
    },

    getAffiliateStats: () =>
        fetchApi<any>('/brand/affiliates/stats'),

    getInviteLink: () =>
        fetchApi<any>('/brand/affiliates/invite-link'),

    inviteAffiliate: (email: string) =>
        fetchApi('/brand/affiliates/invite', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),

    getEarnings: () =>
        fetchApi<any>('/brand/earnings/stats'),

    getMonthlyEarnings: () =>
        fetchApi<any[]>('/brand/earnings/monthly'),

    getPayouts: (filter?: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/brand/payouts${query ? `?${query}` : ''}`);
    },

    getNextPayout: () =>
        fetchApi<any>('/brand/payouts/next'),

    getPayoutSummary: () =>
        fetchApi<any>('/brand/payouts/summary'),

    getPaymentMethod: () =>
        fetchApi<any>('/brand/payment-method'),

    addProduct: (productId: string, retailPrice: number) =>
        fetchApi('/brand/products', {
            method: 'POST',
            body: JSON.stringify({ productId, retailPrice }),
        }),

    // Settings
    getSettings: () =>
        fetchApi<any>('/brand/settings'),

    updateGeneralSettings: (data: any) =>
        fetchApi('/brand/settings/general', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    updateBrandingSettings: (data: any) =>
        fetchApi('/brand/settings/branding', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    uploadLogo: (logoUrl: string) =>
        fetchApi('/brand/settings/branding/logo', {
            method: 'POST',
            body: JSON.stringify({ logoUrl }),
        }),

    setCustomDomain: (domain: string) =>
        fetchApi('/brand/settings/branding/custom-domain', {
            method: 'PUT',
            body: JSON.stringify({ domain }),
        }),

    removeCustomDomain: () =>
        fetchApi('/brand/settings/branding/custom-domain', {
            method: 'DELETE',
        }),

    verifyDns: () =>
        fetchApi('/brand/settings/branding/verify-dns', {
            method: 'POST',
        }),

    getDnsStatus: () =>
        fetchApi<any>('/brand/settings/branding/dns-status'),

    getBillingInfo: () =>
        fetchApi<any>('/brand/settings/billing'),

    updateBillingInfo: (data: any) =>
        fetchApi('/brand/settings/billing/info', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    addPaymentMethod: (data: any) =>
        fetchApi('/brand/settings/billing/payment-methods', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    removePaymentMethod: (id: string) =>
        fetchApi(`/brand/settings/billing/payment-methods/${id}`, {
            method: 'DELETE',
        }),

    updateCommission: (data: any) =>
        fetchApi('/brand/settings/commission', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    updateAffiliateToggle: (data: { enabled: boolean }) =>
        fetchApi('/brand/settings/affiliates', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    getNotificationPrefs: () =>
        fetchApi<any>('/brand/settings/notifications'),

    updateNotificationPrefs: (preferences: Record<string, boolean>) =>
        fetchApi('/brand/settings/notifications', {
            method: 'PUT',
            body: JSON.stringify({ preferences }),
        }),

    rotateApiKey: () =>
        fetchApi<any>('/brand/settings/rotate-api-key', {
            method: 'POST',
        }),
};

export const catalogApi = {
    getProducts: (filter?: { categoryId?: string; search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.categoryId) params.append('categoryId', filter.categoryId);
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/catalog/products${query ? `?${query}` : ''}`);
    },

    getProduct: (id: string) =>
        fetchApi<any>(`/catalog/products/${id}`),

    getCategories: () =>
        fetchApi<any[]>('/catalog/categories'),
};

export const partnerApi = {
    getProfile: () =>
        fetchApi<any>('/partner/me'),

    getStats: () =>
        fetchApi<any>('/partner/dashboard'),

    getBrands: (filter?: { search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/partner/brands${query ? `?${query}` : ''}`);
    },

    getBrandsStats: () =>
        fetchApi<any>('/partner/brands/stats'),

    getBrandsCount: () =>
        fetchApi<any>('/partner/brands/count'),

    getEarnings: () =>
        fetchApi<any>('/partner/earnings'),

    getMonthlyEarnings: () =>
        fetchApi<any[]>('/partner/earnings/monthly'),

    exportEarningsCSV: () =>
        fetchApi<any>('/partner/earnings/export'),

    getPayouts: (filter?: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/partner/payouts${query ? `?${query}` : ''}`);
    },

    getPayoutSummary: () =>
        fetchApi<any>('/partner/payouts/summary'),

    getPayoutDetail: (id: string) =>
        fetchApi<any>(`/partner/payouts/${id}`),

    getPayoutReceipt: (id: string) =>
        fetchApi<any>(`/partner/payouts/${id}/receipt`),

    getPaymentMethod: () =>
        fetchApi<any>('/partner/payment-method'),

    updatePaymentMethod: (data: any) =>
        fetchApi('/partner/payment-method', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    getReferralLink: () =>
        fetchApi<any>('/partner/referral-link'),

    getReferralLinks: (filter?: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/partner/referral-links${query ? `?${query}` : ''}`);
    },

    createReferralLink: (data: any) =>
        fetchApi('/partner/referral-links', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getReferralStats: () =>
        fetchApi<any>('/partner/referral-stats'),

    trackReferralShare: (id: string) =>
        fetchApi(`/partner/referral-links/${id}/track-share`, {
            method: 'POST',
        }),

    getProfileFields: () =>
        fetchApi<any>('/partner/profile'),

    updateProfile: (data: any) =>
        fetchApi('/partner/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};

export const affiliateApi = {
    // Auth
    login: (data: { email: string; password: string }) =>
        fetchApi<{ accessToken: string; user: any }>('/affiliate/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    logout: () =>
        fetchApi('/affiliate/auth/logout', { method: 'POST' }),

    getProfile: () =>
        fetchApi<any>('/affiliate/me'),

    updateProfile: (data: any) =>
        fetchApi('/affiliate/me', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    selectBrand: (brandId: string) =>
        fetchApi('/affiliate/me/selected-brand', {
            method: 'PUT',
            body: JSON.stringify({ brandId }),
        }),

    // Dashboard (requires X-Brand-Id header)
    getDashboardStats: (brandId: string) =>
        fetchApi<any>('/affiliate/dashboard/stats', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getReferralLink: (brandId: string) =>
        fetchApi<any>('/affiliate/dashboard/referral-link', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getTrendingProducts: (brandId: string) =>
        fetchApi<any[]>('/affiliate/dashboard/trending-products', {
            headers: { 'X-Brand-Id': brandId },
        }),

    // Orders (requires X-Brand-Id header)
    getOrders: (brandId: string, filter?: { page?: number; limit?: number; status?: string; dateFrom?: string; dateTo?: string }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        if (filter?.status) params.append('status', filter.status);
        if (filter?.dateFrom) params.append('dateFrom', filter.dateFrom);
        if (filter?.dateTo) params.append('dateTo', filter.dateTo);
        const query = params.toString();
        return fetchApi<any>(`/affiliate/orders${query ? `?${query}` : ''}`, {
            headers: { 'X-Brand-Id': brandId },
        });
    },

    getOrderStats: (brandId: string) =>
        fetchApi<any>('/affiliate/orders/stats', {
            headers: { 'X-Brand-Id': brandId },
        }),

    // Earnings (requires X-Brand-Id header)
    getEarningsStats: (brandId: string) =>
        fetchApi<any>('/affiliate/earnings/stats', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getMonthlyEarnings: (brandId: string) =>
        fetchApi<any[]>('/affiliate/earnings/monthly', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getEarningsByCustomer: (brandId: string) =>
        fetchApi<any[]>('/affiliate/earnings/by-customer', {
            headers: { 'X-Brand-Id': brandId },
        }),

    // Team — L2 affiliates (requires X-Brand-Id header, L1 only)
    getTeam: (brandId: string, filter?: { page?: number; limit?: number; search?: string }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        if (filter?.search) params.append('search', filter.search);
        const query = params.toString();
        return fetchApi<any>(`/affiliate/team${query ? `?${query}` : ''}`, {
            headers: { 'X-Brand-Id': brandId },
        });
    },

    getTeamStats: (brandId: string) =>
        fetchApi<any>('/affiliate/team/stats', {
            headers: { 'X-Brand-Id': brandId },
        }),

    generateTeamInvite: (brandId: string) =>
        fetchApi<any>('/affiliate/team/invite', {
            method: 'POST',
            headers: { 'X-Brand-Id': brandId },
        }),

    updateTeamMember: (brandId: string, id: string, data: any) =>
        fetchApi(`/affiliate/team/${id}`, {
            method: 'PUT',
            headers: { 'X-Brand-Id': brandId },
            body: JSON.stringify(data),
        }),

    updateTeamMemberStatus: (brandId: string, id: string, data: any) =>
        fetchApi(`/affiliate/team/${id}/status`, {
            method: 'PATCH',
            headers: { 'X-Brand-Id': brandId },
            body: JSON.stringify(data),
        }),

    // Payouts
    getPayouts: (brandId: string, filter?: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/affiliate/payouts${query ? `?${query}` : ''}`, {
            headers: { 'X-Brand-Id': brandId },
        });
    },

    getPayoutSummary: (brandId: string) =>
        fetchApi<any>('/affiliate/payouts/summary', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getPaymentMethod: (brandId: string) =>
        fetchApi<any>('/affiliate/payouts/payment-method', {
            headers: { 'X-Brand-Id': brandId },
        }),

    updatePaymentMethod: (brandId: string, data: any) =>
        fetchApi('/affiliate/payouts/payment-method', {
            method: 'PUT',
            headers: { 'X-Brand-Id': brandId },
            body: JSON.stringify(data),
        }),

    getPayoutDetail: (brandId: string, id: string) =>
        fetchApi<any>(`/affiliate/payouts/${id}`, {
            headers: { 'X-Brand-Id': brandId },
        }),

    getPayoutReceipt: (brandId: string, id: string) =>
        fetchApi<any>(`/affiliate/payouts/${id}/receipt`, {
            headers: { 'X-Brand-Id': brandId },
        }),

    // Promo Codes — scoped to a brand (requires X-Brand-Id header)
    getCodes: (brandId: string, filter?: { page?: number; limit?: number; search?: string }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        if (filter?.search) params.append('search', filter.search);
        const query = params.toString();
        return fetchApi<any>(`/affiliate/brands/${brandId}/codes${query ? `?${query}` : ''}`, {
            headers: { 'X-Brand-Id': brandId },
        });
    },

    createCode: (brandId: string, data: any) =>
        fetchApi(`/affiliate/brands/${brandId}/codes`, {
            method: 'POST',
            headers: { 'X-Brand-Id': brandId },
            body: JSON.stringify(data),
        }),

    assignCode: (brandId: string, codeId: string, data: any) =>
        fetchApi(`/affiliate/brands/${brandId}/codes/${codeId}/assign`, {
            method: 'POST',
            headers: { 'X-Brand-Id': brandId },
            body: JSON.stringify(data),
        }),

    // Share Toolkit (requires X-Brand-Id header)
    getShareTemplates: (brandId: string) =>
        fetchApi<any[]>('/affiliate/share/templates', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getShareLinks: (brandId: string) =>
        fetchApi<any[]>('/affiliate/share/links', {
            headers: { 'X-Brand-Id': brandId },
        }),

    // Insights (requires X-Brand-Id header)
    getCustomerStats: (brandId: string) =>
        fetchApi<any>('/affiliate/insights/customers/stats', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getTopCustomers: (brandId: string) =>
        fetchApi<any[]>('/affiliate/insights/customers/top', {
            headers: { 'X-Brand-Id': brandId },
        }),

    getTopProducts: (brandId: string) =>
        fetchApi<any[]>('/affiliate/insights/products/top', {
            headers: { 'X-Brand-Id': brandId },
        }),

    sendOffer: (brandId: string, customerId: string, data: any) =>
        fetchApi(`/affiliate/insights/customers/${customerId}/send-offer`, {
            method: 'POST',
            headers: { 'X-Brand-Id': brandId },
            body: JSON.stringify(data),
        }),

    getBrands: () =>
        fetchApi<any[]>('/affiliate/brands'),

    getAllLinks: () =>
        fetchApi<any[]>('/affiliate/links'),
};

export const storefrontApi = {
    // Public Endpoints
    getConfig: (brandSlug: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/config`),

    getProducts: (brandSlug: string, filter?: { categoryId?: string; search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.categoryId) params.append('categoryId', filter.categoryId);
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/v1/storefront/${brandSlug}/products${query ? `?${query}` : ''}`);
    },

    getProduct: (brandSlug: string, handle: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/products/${handle}`),

    trackClick: (brandSlug: string, data: { ref: string }) =>
        fetchApi(`/v1/storefront/${brandSlug}/track`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Cart
    createCart: (brandSlug: string, data?: { ref?: string }) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/cart`, {
            method: 'POST',
            body: JSON.stringify(data || {}),
        }),

    getCart: (brandSlug: string, cartId: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/cart/${cartId}`),

    updateCart: (brandSlug: string, cartId: string, items: any[]) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/cart/${cartId}`, {
            method: 'PUT',
            body: JSON.stringify({ items }),
        }),

    removeItem: (brandSlug: string, cartId: string, itemId: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/cart/${cartId}/items/${itemId}`, {
            method: 'DELETE',
        }),

    applyDiscount: (brandSlug: string, cartId: string, code: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/cart/${cartId}/discount-code`, {
            method: 'POST',
            body: JSON.stringify({ code }),
        }),

    removeDiscount: (brandSlug: string, cartId: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/cart/${cartId}/discount-code`, {
            method: 'DELETE',
        }),

    // Checkout
    createCheckout: (brandSlug: string, data: { cartId: string; shippingAddress: any; email?: string; name?: string }) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/checkout`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    completeCheckout: (brandSlug: string, sessionId: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/checkout/${sessionId}/complete`, {
            method: 'POST',
        }),

    // Auth
    register: async (brandSlug: string, data: any) => {
        const res = await fetchApi<{ accessToken: string; user: any }>(`/v1/storefront/${brandSlug}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (res.accessToken) setApiToken(res.accessToken);
        return res;
    },

    login: async (brandSlug: string, data: any) => {
        const res = await fetchApi<{ accessToken: string; user: any }>(`/v1/storefront/${brandSlug}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (res.accessToken) setApiToken(res.accessToken);
        return res;
    },

    forgotPassword: (brandSlug: string, email: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/auth/forgot-password`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),

    resetPassword: (brandSlug: string, data: any) =>
        fetchApi(`/v1/storefront/${brandSlug}/auth/reset-password`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    logout: (brandSlug: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/auth/logout`, { method: 'POST' }),

    guestToAccount: async (brandSlug: string, data: any) => {
        const res = await fetchApi<any>(`/v1/storefront/${brandSlug}/auth/guest-to-account`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (res.accessToken) setApiToken(res.accessToken);
        return res;
    },

    // Account (Auth Required)
    getAccount: (brandSlug: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account`),

    updateAccount: (brandSlug: string, data: any) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    getOrders: (brandSlug: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account/orders`),

    getOrder: (brandSlug: string, id: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account/orders/${id}`),

    getAddresses: (brandSlug: string) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account/addresses`),

    addAddress: (brandSlug: string, data: any) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account/addresses`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateAddress: (brandSlug: string, id: string, data: any) =>
        fetchApi<any>(`/v1/storefront/${brandSlug}/account/addresses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteAddress: (brandSlug: string, id: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/account/addresses/${id}`, {
            method: 'DELETE',
        }),

    getWishlist: (brandSlug: string) =>
        fetchApi<any[]>(`/v1/storefront/${brandSlug}/account/wishlist`),

    addToWishlist: (brandSlug: string, brandProductId: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/account/wishlist/${brandProductId}`, {
            method: 'POST',
        }),

    removeFromWishlist: (brandSlug: string, brandProductId: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/account/wishlist/${brandProductId}`, {
            method: 'DELETE',
        }),

    // Reviews
    submitReview: (brandSlug: string, handle: string, data: any) =>
        fetchApi(`/v1/storefront/${brandSlug}/products/${handle}/reviews`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateReview: (brandSlug: string, handle: string, reviewId: string, data: any) =>
        fetchApi(`/v1/storefront/${brandSlug}/products/${handle}/reviews/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    deleteReview: (brandSlug: string, handle: string, reviewId: string) =>
        fetchApi(`/v1/storefront/${brandSlug}/products/${handle}/reviews/${reviewId}`, {
            method: 'DELETE',
        }),
};

export const labApi = {
    getProfile: () =>
        fetchApi<any>('/lab/me'),

    getStats: () =>
        fetchApi<any>('/lab/dashboard/stats'),

    getNavBadges: () =>
        fetchApi<any>('/lab/nav-badges'),

    // Purchase Orders
    getPurchaseOrders: (filter?: { status?: string; search?: string; page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.status && filter.status !== 'all') params.append('status', filter.status.toUpperCase());
        if (filter?.search) params.append('search', filter.search);
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/lab/purchase-orders${query ? `?${query}` : ''}`);
    },

    getPurchaseOrder: (id: string) =>
        fetchApi<any>(`/lab/purchase-orders/${id}`),

    updatePOStatus: (id: string, status: string) =>
        fetchApi(`/lab/purchase-orders/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: status.toUpperCase() }),
        }),

    addTracking: (id: string, data: { courier: string; trackingNumber: string }) =>
        fetchApi(`/lab/purchase-orders/${id}/tracking`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    getLabel: (id: string) =>
        fetchApi<any>(`/lab/purchase-orders/${id}/label`),

    // Earnings & Payouts
    getEarningsStats: () =>
        fetchApi<any>('/lab/earnings/stats'),

    getMonthlyEarnings: () =>
        fetchApi<any[]>('/lab/earnings/monthly'),

    getPayouts: (filter?: { page?: number; limit?: number }) => {
        const params = new URLSearchParams();
        if (filter?.page) params.append('page', filter.page.toString());
        if (filter?.limit) params.append('limit', filter.limit.toString());
        const query = params.toString();
        return fetchApi<any>(`/lab/payouts${query ? `?${query}` : ''}`);
    },

    getPayoutReceipt: (id: string) =>
        fetchApi<any>(`/lab/payouts/${id}/receipt`),

    // Settings
    getSettings: () =>
        fetchApi<any>('/lab/settings'),

    updateSettings: (data: any) =>
        fetchApi('/lab/settings', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};
