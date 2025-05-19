/// <reference types="vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page'; // adapte le chemin selon ton projet
import { describe, it, expect } from 'vitest';

describe('Home', () => {
  it('affiche le titre principal', () => {
    render(<Home />);
    expect(screen.getByText(/Une meilleure vision/i)).toBeInTheDocument();
  });

  it('affiche le lien vers la carte', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Voir la carte/i })).toBeInTheDocument();
  });

  it('affiche le lien vers monPortail', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Aller sur monPortail/i })).toBeInTheDocument();
  });

  it('affiche l’image avec un alt correct', () => {
    render(<Home />);
    expect(screen.getByAltText(/Présentation Immovision/i)).toBeInTheDocument();
  });
});
