import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001/events';

export function useEvents(brandId?: string) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!brandId) return;

        const token = typeof window !== 'undefined' ? localStorage.getItem('storefront_token') : null;

        const s = io(WEBSOCKET_URL, {
            query: { brandId },
            auth: { token },
            transports: ['websocket'],
        });

        s.on('connect', () => {
            console.log('Connected to events gateway');
            setConnected(true);
        });

        s.on('disconnect', () => {
            console.log('Disconnected from events gateway');
            setConnected(false);
        });

        setSocket(s);

        return () => {
            s.disconnect();
            setSocket(null);
        };
    }, [brandId]);

    return {
        connected,
        socket,
    };
}
