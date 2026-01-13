import { render, screen, waitFor } from '@testing-library/react';
import FlatListApp from './FlatListApp';

describe('FlatListApp (user app)', () => {
  const OLD_ENV = import.meta.env;

  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it('menampilkan loading lalu daftar rusun ketika fetch berhasil', async () => {
    const mockFlats = [
      { flat_id: 'F001', flat_name: 'Rusun A' },
      { flat_id: 'F002', flat_name: 'Rusun B' }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockFlats })
    });

    render(<FlatListApp />);

    expect(screen.getByText('Memuat data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rusun A')).toBeInTheDocument();
      expect(screen.getByText('Rusun B')).toBeInTheDocument();
    });

    expect(screen.queryByText('Gagal mengambil flat')).not.toBeInTheDocument();
  });

  it('menampilkan pesan error ketika response tidak ok', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'some error' })
    });

    render(<FlatListApp />);

    await waitFor(() => {
      expect(screen.getByText('Gagal mengambil flat')).toBeInTheDocument();
    });
  });

  it('menampilkan pesan error jaringan ketika fetch throw', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<FlatListApp />);

    await waitFor(() => {
      expect(screen.getByText('Kesalahan jaringan')).toBeInTheDocument();
    });
  });
});