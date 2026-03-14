import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001/events';

export function useEvents(brandId?: string) {
    const socketRef = useRef<Socket | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!brandId) return;

        const socket = io(WEBSOCKET_URL, {
            query: { brandId },
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to events gateway');
            setConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from events gateway');
            setConnected(false);
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [brandId]);

    return {
        connected,
        socket: socketRef.current,
    };
}
