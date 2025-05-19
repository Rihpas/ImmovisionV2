'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Message envoyé avec succès !');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Erreur lors de l’envoi.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '40px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#fff',
        color: '#000',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)'
      }}
    >
      <h1 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>Contactez-moi</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              outline: 'none',
              color: '#000',
              backgroundColor: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Votre email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              outline: 'none',
              color: '#000',
              backgroundColor: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <textarea
            placeholder="Votre message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              outline: 'none',
              resize: 'vertical',
              color: '#000',
              backgroundColor: '#fff'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Envoyer
        </button>
      </form>

      {status && (
        <p style={{ marginTop: '20px', textAlign: 'center', color: status.includes('succès') ? 'green' : 'red' }}>
          {status}
        </p>
      )}
    </div>
  );
}
