// frontend/src/components/Visitor/VisitorToggle.tsx
'use client';

import { useState } from 'react';
import NewVisitorForm from '@/components/Admin/createNewGuest';

export default function VisitorToggle() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="max-w-lg mx-auto p-4">
            <button
                onClick={() => setShowForm(prev => !prev)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                {showForm ? 'Formular verbergen' : 'Neuen Besucher anlegen'}
            </button>

            {showForm && <NewVisitorForm />}
        </div>
    );
}
