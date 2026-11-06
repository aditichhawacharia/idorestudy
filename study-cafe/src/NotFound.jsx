import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound(){return <main className="content-page"><section className="content-card not-found"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page may have moved or the address may be incorrect.</p><Link className="primary-btn link-btn" to="/">Return to the study room</Link></section></main>}
