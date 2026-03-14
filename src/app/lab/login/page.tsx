'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LabLoginRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="size-8 border-4 border-primary-base border-t-transparent animate-spin rounded-full" />
        </div>
    );
}
