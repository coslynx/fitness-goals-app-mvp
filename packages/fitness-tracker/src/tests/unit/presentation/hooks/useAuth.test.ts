import { renderHook, act } from '@testing-library/react-hooks';
import { Session } from 'next-auth/react';
import useAuth from '../../../../../src/presentation/hooks/useAuth';

describe('useAuth', () => {
  let session: Session | null;
  let mockSignOut: jest.Mock;

  beforeEach(() => {
    session = {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    };
    mockSignOut = jest.fn();

    jest.mock('next-auth/react', () => ({
      ...jest.requireActual('next-auth/react'),
      useSession: () => ({
        data: session,
        status: 'authenticated',
      }),
      signOut: mockSignOut,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user session data', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.session).toEqual(session);
  });

  it('should return isLoading as false initially', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(false);
  });

  it('should return error as null initially', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.error).toBe(null);
  });

  it('should call signOut and update isLoading and error on handleLogout', async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    await act(() => result.current.handleLogout());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('should handle errors during logout and update isLoading and error', async () => {
    const { result } = renderHook(() => useAuth());
    const mockError = new Error('Logout failed');

    jest.mock('next-auth/react', () => ({
      ...jest.requireActual('next-auth/react'),
      signOut: () => Promise.reject(mockError),
    }));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    await act(() => result.current.handleLogout());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(mockError.message);
  });
});