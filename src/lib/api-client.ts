const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function setApiToken(token: string) {
    // Session is now handled via HttpOnly cookies by the server
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        if (response.status === 401 && typeof window !== 'undefined' && !endpoint.startsWith('/auth/')) {
            // Redirect to login page - the backend cookie will be disregarded or cleared on login
            window.location.href = '/login';
            return new Promise(() => { });
        }
        const errText = await response.text();
        const error = errText ? JSON.parse(errText) : { message: 'An unknown error occurred' };
        throw new Error(error.message || `API error: ${response.statusText}`);
    }

    if (response.status === 204) {
        return {} as T;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
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
};
