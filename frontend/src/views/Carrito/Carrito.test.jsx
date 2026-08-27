import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotificationProvider } from '../../context/NotificationContext';
import Carrito from './Carrito';
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

describe('Carrito - Suite de Pruebas', () => {
  const defaultProps = {
    carrito: [],
    restarDelCarrito: vi.fn(),
    vaciarCarrito: vi.fn(),
    usuario: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCarrito = (props = {}) => {
    return render(
      <MemoryRouter>
        <NotificationProvider>
          <Carrito {...defaultProps} {...props} />
        </NotificationProvider>
      </MemoryRouter>
    );
  };

  it('debe mostrar un mensaje si el carrito está vacío', () => {
    renderCarrito({ carrito: [] });
    
    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument();
    expect(screen.queryByText(/Resumen de Compra/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Confirmar Pedido/i)).not.toBeInTheDocument();
  });

  it('debe renderizar los productos en el carrito y calcular el total correctamente', () => {
    const carritoMock = [
      { id: '1', nombre: 'Mouse Gamer', precio: 50.0, cantidad: 2 },
      { id: '2', nombre: 'Teclado Mecánico', precio: 100.0, cantidad: 1 },
    ];

    renderCarrito({ carrito: carritoMock });

    // Verificar que los nombres de los productos aparezcan
    expect(screen.getByText('Mouse Gamer')).toBeInTheDocument();
    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();

    // Verificar las cantidades individuales
    expect(screen.getByText('Cant: 2')).toBeInTheDocument();
    expect(screen.getByText('Cant: 1')).toBeInTheDocument();

    // Verificar el cálculo del total (50*2 + 100*1 = 200)
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200/i)).toBeInTheDocument();
  });

  it('debe invocar a restarDelCarrito al hacer clic en el botón de restar', () => {
    const restarMock = vi.fn();
    const carritoMock = [
      { id: '1', nombre: 'Mouse Gamer', precio: 50.0, cantidad: 2 },
    ];

    renderCarrito({ carrito: carritoMock, restarDelCarrito: restarMock });

    const btnRestar = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(btnRestar);

    expect(restarMock).toHaveBeenCalledWith('1');
  });

  it('debe mostrar notificación y redirigir al login si un invitado intenta confirmar compra', async () => {
    vi.useFakeTimers();
    const carritoMock = [
      { id: '1', nombre: 'Mouse Gamer', precio: 50.0, cantidad: 1 },
    ];

    renderCarrito({ carrito: carritoMock, usuario: null });

    const btnConfirmar = screen.getByRole('button', { name: /Confirmar Pedido/i });
    fireEvent.click(btnConfirmar);

    // Debe mostrar la notificación oval flotante de bloqueo
    expect(screen.getByText(/Inicia sesión para finalizar la compra/i)).toBeInTheDocument();

    // Adelantamos los timers 2 segundos
    vi.advanceTimersByTime(2000);
    expect(mockNavigate).toHaveBeenCalledWith('/login');

    vi.useRealTimers();
  });
});
