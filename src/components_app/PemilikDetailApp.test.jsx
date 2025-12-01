import { render, screen, waitFor } from '@testing-library/react';
import PemilikDetailApp from './PemilikDetailApp';

describe('PemilikDetailApp (user)', () => {
  let consoleErrorSpy;

  const muteConsoleError = () => {
    if (!consoleErrorSpy) {
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = undefined;
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
      consoleErrorSpy = null;
    }
  });

  it('menampilkan data pemilik ketika fetch berhasil', async () => {
    const mockPemilik = {
      pemilik_id: 'PM001',
      nama: 'Budi',
      nik: '123',
      tanggal_lahir: '1990-01-01',
      jenis_kelamin: 'L',
      no_telepon: '08000000',
      alamat: 'Jl. X'
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockPemilik })
    });

    render(<PemilikDetailApp />);

    expect(screen.getByText('Memuat data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('PM001')).toBeInTheDocument();
      expect(screen.getByText('Budi')).toBeInTheDocument();
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(screen.getByText('Jl. X')).toBeInTheDocument();
    });

    expect(
      screen.queryByText('Gagal mengambil data pemilik')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Gagal terhubung ke server.')
    ).not.toBeInTheDocument();
  });

  it('menampilkan error ketika response tidak ok', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Not found' })
    });

    render(<PemilikDetailApp />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('menampilkan error jaringan ketika fetch throw', async () => {
    muteConsoleError();
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<PemilikDetailApp />);

    await waitFor(() => {
      expect(
        screen.getByText('Gagal terhubung ke server.')
      ).toBeInTheDocument();
    });
  });
});