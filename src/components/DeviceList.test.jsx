/* eslint-env node, jest */
/* global vi, expect, describe, it, beforeEach, afterEach */

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeviceList from './DeviceList';

// Mock react-router-dom: pakai MemoryRouter + mock useNavigate
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('DeviceList (admin)', () => {
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
    global.fetch = vi.fn();
    confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = undefined;
    confirmSpy.mockRestore();
    alertSpy.mockRestore();
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
      consoleErrorSpy = null;
    }
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <DeviceList />
      </MemoryRouter>
    );

  it('menampilkan loading lalu daftar device ketika fetch berhasil', async () => {
    const mockDevices = [
      { device_id: 1, device_name: 'Sensor A', device_type: 'sensor', status: 'active' },
      { device_id: 2, device_name: 'Actuator B', device_type: 'actuator', status: 'inactive' }
    ];

    // GET /devices
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ devices: mockDevices })
    });

    renderWithRouter();

    // loading muncul
    expect(screen.getByText('Memuat data...')).toBeInTheDocument();

    // data muncul
    await waitFor(() => {
      expect(screen.getByText('Sensor A')).toBeInTheDocument();
      expect(screen.getByText('Actuator B')).toBeInTheDocument();
    });

    // tidak ada error
    expect(
      screen.queryByText('Gagal memuat daftar device.')
    ).not.toBeInTheDocument();
  });

  it('menampilkan error ketika fetch gagal', async () => {
    muteConsoleError();
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText('Gagal memuat daftar device.')
      ).toBeInTheDocument();
    });
  });

  it('menghapus device ketika DELETE sukses', async () => {
    const mockDevices = [
      { device_id: 1, device_name: 'Sensor A', device_type: 'sensor', status: 'active' }
    ];

    // 1) GET /devices
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ devices: mockDevices })
      })
      // 2) DELETE /devices/1
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Device berhasil dihapus.' })
      });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Sensor A')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    // confirm dipanggil
    expect(confirmSpy).toHaveBeenCalled();

    // setelah delete, list kosong → "Belum ada device."
    await waitFor(() => {
      expect(screen.getByText('Belum ada device.')).toBeInTheDocument();
    });

    expect(alertSpy).toHaveBeenCalledWith('Device berhasil dihapus.');
  });

  it('tidak memanggil DELETE ketika user cancel confirm', async () => {
    confirmSpy.mockReturnValueOnce(false);

    const mockDevices = [
      { device_id: 1, device_name: 'Sensor A', device_type: 'sensor', status: 'active' }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ devices: mockDevices })
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Sensor A')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Hapus');
    fireEvent.click(deleteButton);

    // Hanya 1 call ke fetch (GET), tidak ada DELETE
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});