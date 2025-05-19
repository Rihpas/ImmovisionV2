/// <reference types="vitest" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonPortail from '../app/monPortail/page';
import { describe, it, expect } from 'vitest';

describe('MonPortail', () => {
  it('affiche les titres et le champ email', () => {
    render(<MonPortail />);

    expect(screen.getByText(/Bienvenue sur votre portail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/exemple@domaine.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Charger les cartes/i)).toBeInTheDocument();
  });

  it('désactive le bouton de chargement si l’email est vide', () => {
    render(<MonPortail />);
    const chargerBtn = screen.getByText(/Charger les cartes/i);
    expect(chargerBtn).toBeDisabled();
  });

  it('active le bouton de chargement après saisie d’un email', () => {
    render(<MonPortail />);
    const input = screen.getByPlaceholderText(/exemple@domaine.com/i);
    const chargerBtn = screen.getByText(/Charger les cartes/i);

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(chargerBtn).not.toBeDisabled();
  });

 
});
