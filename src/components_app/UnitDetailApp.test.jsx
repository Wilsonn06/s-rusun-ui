import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UnitDetailApp from './UnitDetailApp';

vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useParams: () => ({ unit_id: 'U001' }),
    useNavigate: () => vi.fn()
  };
});

describe('UnitDetailApp (user)', () => {
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

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <UnitDetailApp />
      </MemoryRouter>
    );

  it('menampilkan detail unit dan daftar device ketika kedua fetch berhasil', async () => {
    const mockUnit = {
      unit_id: 'U001',
      unit_number: '101',
      pemilik_nama: 'Budi',
      tower_name: 'Tower 1',
      floor_number: 1,
      flat_name: 'Rusun A'
    };

    const mockDevices = [
      {
        device_id: 1,
        device_name: 'Sensor A',
        device_type: 'sensor',
        status: 'active'
      }
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUnit
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ devices: mockDevices })
      });

    renderWithRouter();

    expect(screen.getByText('Memuat data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('U001')).toBeInTheDocument();
      expect(screen.getByText('101')).toBeInTheDocument();
      expect(screen.getByText('Budi')).toBeInTheDocument();
      expect(screen.getByText('Tower 1')).toBeInTheDocument();
      expect(screen.getByText('Rusun A')).toBeInTheDocument();

      expect(screen.getByText('Sensor A')).toBeInTheDocument();
      expect(screen.getByText('sensor')).toBeInTheDocument();
      expect(screen.getByText('active')).toBeInTheDocument();
    });

    expect(
      screen.queryByText('Gagal memuat detail unit')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Gagal memuat data device')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Kesalahan jaringan')
    ).not.toBeInTheDocument();
  });

  it('menampilkan error ketika fetch unit gagal (response !ok)', async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Unit tidak ditemukan.' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ devices: [] })
      });

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText('Unit tidak ditemukan.')
      ).toBeInTheDocument();
    });
  });

  it('menampilkan error ketika fetch devices gagal (response !ok)', async () => {
    const mockUnit = {
      unit_id: 'U001',
      unit_number: '101',
      pemilik_nama: 'Budi',
      tower_name: 'Tower 1',
      floor_number: 1,
      flat_name: 'Rusun A'
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUnit
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Device error' })
      });

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText('Device error')
      ).toBeInTheDocument();
    });
  });

  it('menampilkan error jaringan ketika salah satu fetch throw', async () => {
    muteConsoleError();
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText('Kesalahan jaringan')
      ).toBeInTheDocument();
    });
  });
});