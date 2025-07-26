'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface WindowsAuthProps {
    children: ReactNode;
}

export default function WindowsAuth({ children }: WindowsAuthProps) {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Automatischer NTLM‑Login ohne User‑Interaction
        fetch('http://localhost:5000/api/auth/windows', {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error('unauthenticated');
                return res.json();
            })
            .then(() => {
                setAuthorized(true);
            })
            .catch(() => {
                setAuthorized(false);
                router.replace('/unauthorized'); // oder /login
            });
    }, []);

    // Lade‑State: nichts rendern (oder Spinner)
    if (authorized === null) return null;

    // autorisiert → rendere geschützten Content
    return <>{children}</>;
}
