// frontend/src/components/Visitor/NewVisitorForm.tsx
'use client';

import { useState } from 'react';

interface Visitor {
    name: string;
    company: string;
}

export default function NewVisitorForm() {
    const [visitor, setVisitor] = useState<Visitor>({ name: '', company: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVisitor({ ...visitor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!visitor.name.trim() || !visitor.company.trim()) {
            setError('Bitte Name und Firma ausfüllen.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/visitors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(visitor)
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Fehler beim Anlegen');
            }

            setSuccess(true);
            setVisitor({ name: '', company: '' });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Neuen Besucher anlegen</h2>

            {error && <div className="mb-4 text-red-600">⚠️ {error}</div>}
            {success && <div className="mb-4 text-green-600">✔️ Besucher erfolgreich angelegt!</div>}

            <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                    name="name"
                    type="text"
                    value={visitor.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Max Mustermann"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 font-medium">Firma</label>
                <input
                    name="company"
                    type="text"
                    value={visitor.company}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Acme GmbH"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Speichere …' : 'Anlegen'}
            </button>
        </form>
    );
}
