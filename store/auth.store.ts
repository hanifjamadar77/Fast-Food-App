import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@sentry/react-native';
import { create } from 'zustand'

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser : (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });
        try {
            // Simulate fetching user data
            const user = await getCurrentUser();

            if(user) set({ isAuthenticated: true, user: user as User });
            else set({ isAuthenticated: false, user: null });
        } catch (error) {
            console.error('Failed to fetch authenticated user:', error);
            set({ isAuthenticated: false, user: null });
        } finally {
            set({ isLoading: false });
        }
    }
}))

export default useAuthStore;
