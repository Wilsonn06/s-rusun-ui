import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlatList from './FlatList';

// mock api.js
vi.mock('../api', () => ({
  getFlats: vi.fn(),
  deleteFlat: vi.fn()
}));

// react-router-dom: kita pakai MemoryRouter + mock useNavigate
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

import { getFlats, deleteFlat } from '../api';

describe('FlatList (admin)', () => {
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

  const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it('menampilkan loading lalu tabel rusun ketika data tersedia', async () => {
    const mockFlats = [
      { flat_id: 'F001', flat_name: 'Rusun A', flat_address: 'Jl. A' },
      { flat_id: 'F002', flat_name: 'Rusun B', flat_address: 'Jl. B' }
    ];

    getFlats.mockResolvedValueOnce(mockFlats);

    renderWithRouter(<FlatList />);

    // loading muncul
    expect(screen.getByText('Memuat data...')).toBeInTheDocument();

    // data muncul
    await waitFor(() => {
      expect(screen.getByText('Rusun A')).toBeInTheDocument();
      expect(screen.getByText('Rusun B')).toBeInTheDocument();
    });

    // tidak ada error
    expect(
      screen.queryByText('Terjadi kesalahan saat memuat data.')
    ).not.toBeInTheDocument();
  });

  it('menampilkan pesan "Belum ada rusun." ketika list kosong', async () => {
    getFlats.mockResolvedValueOnce([]);

    renderWithRouter(<FlatList />);

    await waitFor(() => {
      expect(screen.getByText('Belum ada rusun.')).toBeInTheDocument();
    });
  });

  it('menampilkan error ketika getFlats gagal', async () => {
    muteConsoleError();
    getFlats.mockRejectedValueOnce(new Error('DB error'));

    renderWithRouter(<FlatList />);

    await waitFor(() => {
      expect(
        screen.getByText('Terjadi kesalahan saat memuat data.')
      ).toBeInTheDocument();
    });
  });

  it('menghapus rusun ketika deleteFlat sukses', async () => {
    const mockFlats = [
      { flat_id: 'F001', flat_name: 'Rusun A', flat_address: 'Jl. A' }
    ];

    getFlats.mockResolvedValueOnce(mockFlats).mockResolvedValueOnce([]); // setelah delete, loadData lagi
    deleteFlat.mockResolvedValueOnce({});

    renderWithRouter(<FlatList />);

    await waitFor(() => {
      expect(screen.getByText('Rusun A')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    // confirm dipanggil sekali
    expect(confirmSpy).toHaveBeenCalled();

    // setelah delete, list kosong → muncul "Belum ada rusun."
    await waitFor(() => {
      expect(screen.getByText('Belum ada rusun.')).toBeInTheDocument();
    });

    // alert sukses dipanggil
    expect(alertSpy).toHaveBeenCalledWith('Rusun berhasil dihapus.');
  });

  it('tidak menghapus rusun ketika user cancel confirm', async () => {
    confirmSpy.mockReturnValueOnce(false);
    const mockFlats = [
      { flat_id: 'F001', flat_name: 'Rusun A', flat_address: 'Jl. A' }
    ];
    getFlats.mockResolvedValueOnce(mockFlats);

    renderWithRouter(<FlatList />);

    await waitFor(() => {
      expect(screen.getByText('Rusun A')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    expect(deleteFlat).not.toHaveBeenCalled();
  });
});