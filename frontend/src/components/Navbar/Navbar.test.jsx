import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from './Navbar';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar - Suite de Pruebas', () => {
  const defaultProps = {
    usuario: null,
    onLogout: vi.fn(),
    carrito: [],
    busqueda: '',
    setBusqueda: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderNavbar = (props = {}) => {
    return render(
      <MemoryRouter>
        <ThemeProvider>
          <Navbar {...defaultProps} {...props} />
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('debe renderizar el logo y el nombre de la tienda', () => {
    renderNavbar();
    expect(screen.getByText('UTN Computer Store')).toBeInTheDocument();
    expect(screen.getByAltText('Logo UTN')).toBeInTheDocument();
  });

  it('debe mostrar el botón de "Iniciar Sesión" si el usuario es invitado (guest)', () => {
    renderNavbar({ usuario: null });
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Menú de usuario' })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Buscar producto.../i)).not.toBeInTheDocument();
  });

  it('debe mostrar el buscador y el botón de hamburguesa si el usuario está autenticado', () => {
    const usuarioMock = { username: 'santiago', rol: 'USER' };
    renderNavbar({ usuario: usuarioMock });

    expect(screen.getByPlaceholderText(/Buscar producto.../i)).toBeInTheDocument();
    const toggleBtn = screen.getByRole('button', { name: 'Menú de usuario' });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn.textContent).toBe('☰');
  });

  it('debe abrir y cerrar el menú drawer al hacer clic en el botón de hamburguesa', () => {
    const usuarioMock = { username: 'santiago', rol: 'USER' };
    renderNavbar({ usuario: usuarioMock });

    const toggleBtn = screen.getByRole('button', { name: 'Menú de usuario' });
    const drawer = document.querySelector('.navbar-drawer');

    // Inicialmente no debe tener la clase activo
    expect(drawer.className).not.toContain('activo');

    // Clic para abrir
    fireEvent.click(toggleBtn);
    expect(drawer.className).toContain('activo');
    expect(toggleBtn.textContent).toBe('✖');

    // Clic para cerrar
    fireEvent.click(toggleBtn);
    expect(drawer.className).not.toContain('activo');
    expect(toggleBtn.textContent).toBe('☰');
  });

  it('debe mostrar el panel de gestión solo si el usuario es ADMIN', async () => {
    // 1. Con usuario común (USER)
    const { rerender } = renderNavbar({ usuario: { username: 'pepe', rol: 'USER' } });
    
    // Abrimos el drawer
    fireEvent.click(screen.getByRole('button', { name: 'Menú de usuario' }));
    expect(screen.queryByText(/Panel de Gestión/i)).not.toBeInTheDocument();

    // 2. Con administrador (ADMIN)
    rerender(
      <MemoryRouter>
        <ThemeProvider>
          <Navbar {...defaultProps} usuario={{ username: 'admin', rol: 'ADMIN' }} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Panel de Gestión/i)).toBeInTheDocument();
  });

  it('debe invocar a setBusqueda y navegar a /productos al escribir en el buscador', () => {
    const usuarioMock = { username: 'santiago', rol: 'USER' };
    const setBusquedaMock = vi.fn();
    renderNavbar({ usuario: usuarioMock, setBusqueda: setBusquedaMock });

    const input = screen.getByPlaceholderText(/Buscar producto.../i);
    fireEvent.change(input, { target: { value: 'teclado' } });

    expect(setBusquedaMock).toHaveBeenCalledWith('teclado');
    expect(mockNavigate).toHaveBeenCalledWith('/productos');
  });
});
