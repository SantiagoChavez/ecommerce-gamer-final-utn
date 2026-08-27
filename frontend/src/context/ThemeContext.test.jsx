import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Componente helper para consumir el contexto en los tests
const TestComponent = () => {
  const { tema, toggleTema } = useTheme();
  return (
    <div>
      <span data-testid="tema-valor">{tema}</span>
      <button onClick={toggleTema} data-testid="toggle-btn">Cambiar</button>
    </div>
  );
};

describe('ThemeContext - Suite de Pruebas', () => {
  beforeEach(() => {
    // Limpiamos el localStorage y las clases del root antes de cada test
    localStorage.clear();
    document.documentElement.className = '';
    vi.clearAllMocks();
  });

  it('debe inicializar con el tema "dark" por defecto', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('tema-valor').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(document.documentElement.classList.contains('light-mode')).toBe(false);
  });

  it('debe alternar el tema al hacer clic y persistir en localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByTestId('toggle-btn');
    
    // Cambiar a light
    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('tema-valor').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light-mode')).toBe(true);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
    expect(localStorage.getItem('tema')).toBe('light');

    // Cambiar de vuelta a dark
    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('tema-valor').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(document.documentElement.classList.contains('light-mode')).toBe(false);
    expect(localStorage.getItem('tema')).toBe('dark');
  });

  it('debe inicializarse con el tema guardado en localStorage', () => {
    localStorage.setItem('tema', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('tema-valor').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light-mode')).toBe(true);
  });
});
