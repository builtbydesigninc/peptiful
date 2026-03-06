const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function setApiToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(error.message || `API error: ${response.statusText}`);
    }

    return response.json();
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

    getPartners: (filter?: string) =>
        fetchApi<any[]>(`/admin/partners${filter && filter !== 'all' ? `?status=${filter.toUpperCase()}` : ''}`),

    getOrders: (filter?: string) =>
        fetchApi<any[]>(`/admin/orders${filter && filter !== 'all' ? `?status=${filter.toUpperCase()}` : ''}`),

    getPayouts: () => fetchApi<any[]>('/admin/payouts'),

    approvePayout: (id: string) =>
        fetchApi(`/admin/payouts/${id}/approve`, { method: 'POST' }),

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
