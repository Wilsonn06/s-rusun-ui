/* eslint-env node, jest */
/* global vi, expect, describe, it, beforeEach, afterEach */

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UnitList from './UnitList';

vi.mock('../api', () => ({
  getAllUnits: vi.fn(),
  getUnitsByFloor: vi.fn(),
  getUserUnits: vi.fn(),
  deleteUnit: vi.fn()
}));

vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

import { getAllUnits, getUnitsByFloor, getUserUnits, deleteUnit } from '../api';

describe('UnitList', () => {
  let confirmSpy;
  let alertSpy;
  let consoleErrorSpy;

  const muteConsoleError = () => {
    if (!consoleErrorSpy) {
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    confirmSpy.mockRestore();
    alertSpy.mockRestore();
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
      consoleErrorSpy = null;
    }
  });

  const renderWithRouter = (ui) =>
    render(
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    );

  it('memuat semua unit (admin) ketika tidak ada floor_id dan isUser=false', async () => {
    const mockUnits = [
      {
        unit_id: 'U001',
        unit_number: '101',
        floor_number: 1,
        tower_name: 'Tower 1',
        flat_name: 'Rusun A'
      }
    ];

    getAllUnits.mockResolvedValueOnce(mockUnits);

    renderWithRouter(<UnitList />);

    expect(screen.getByText('Memuat data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('U001')).toBeInTheDocument();
      expect(screen.getByText('101')).toBeInTheDocument();
    });

    expect(
      screen.queryByText('Terjadi kesalahan saat memuat daftar unit.')
    ).not.toBeInTheDocument();
  });

  it('memuat unit berdasarkan floor_id', async () => {
    const mockUnits = [
      {
        unit_id: 'U001',
        unit_number: '101',
        floor_number: 1,
        tower_name: 'Tower 1',
        flat_name: 'Rusun A'
      }
    ];

    getUnitsByFloor.mockResolvedValueOnce(mockUnits);

    renderWithRouter(<UnitList floor_id="FL001" />);

    await waitFor(() => {
      expect(getUnitsByFloor).toHaveBeenCalledWith('FL001');
      expect(screen.getByText('U001')).toBeInTheDocument();
    });
  });

  it('memuat unit user ketika isUser=true', async () => {
    const mockUnits = [
      {
        unit_id: 'U001',
        unit_number: '101',
        floor_number: 1,
        tower_name: 'Tower 1',
        flat_name: 'Rusun A'
      }
    ];

    getUserUnits.mockResolvedValueOnce({ data: mockUnits });

    renderWithRouter(<UnitList isUser />);

    await waitFor(() => {
      expect(getUserUnits).toHaveBeenCalled();
      expect(screen.getByText('U001')).toBeInTheDocument();
    });
  });

  it('menampilkan error ketika loadUnits gagal', async () => {
    muteConsoleError();
    getAllUnits.mockRejectedValueOnce(new Error('DB error'));

    renderWithRouter(<UnitList />);

    await waitFor(() => {
      expect(
        screen.getByText('Terjadi kesalahan saat memuat daftar unit.')
      ).toBeInTheDocument();
    });
  });

  it('menghapus unit ketika deleteUnit sukses (admin)', async () => {
    const mockUnits = [
      {
        unit_id: 'U001',
        unit_number: '101',
        floor_number: 1,
        tower_name: 'Tower 1',
        flat_name: 'Rusun A'
      }
    ];

    getAllUnits.mockResolvedValueOnce(mockUnits);
    deleteUnit.mockResolvedValueOnce({});

    renderWithRouter(<UnitList />);

    await waitFor(() => {
      expect(screen.getByText('U001')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Belum ada unit.')).toBeInTheDocument();
    });

    expect(alertSpy).toHaveBeenCalledWith('Unit berhasil dihapus.');
  });

  it('tidak menampilkan tombol Hapus ketika isUser=true', async () => {
    const mockUnits = [
      {
        unit_id: 'U001',
        unit_number: '101',
        floor_number: 1,
        tower_name: 'Tower 1',
        flat_name: 'Rusun A'
      }
    ];

    getUserUnits.mockResolvedValueOnce({ data: mockUnits });

    renderWithRouter(<UnitList isUser />);

    await waitFor(() => {
      expect(screen.getByText('U001')).toBeInTheDocument();
    });

    // ketika isUser=true, kolom Aksi dan tombol Hapus tidak dirender
    expect(screen.queryByText('Hapus')).not.toBeInTheDocument();
  });
});