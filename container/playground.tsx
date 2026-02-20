import '@/theme.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { Container } from '@/components/Container';

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <React.StrictMode>
            <Container />
        </React.StrictMode>
    );
}
