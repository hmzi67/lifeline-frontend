import { useAuthStore, useUserStore } from '@/stores';

export const DebugComponent = () => {
    const authStore = useAuthStore();
    const userStore = useUserStore();

    return (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <div className="text-sm space-y-1">
                <div>Auth - isAuthenticated: {authStore.isAuthenticated ? 'true' : 'false'}</div>
                <div>Auth - isLoading: {authStore.isLoading ? 'true' : 'false'}</div>
                <div>Auth - user: {authStore.user ? 'exists' : 'null'}</div>
                <div>User - profile: {userStore.profile ? 'exists' : 'null'}</div>
                <div>User - isLoading: {userStore.isLoading ? 'true' : 'false'}</div>
                <div>User - error: {userStore.error || 'none'}</div>
            </div>
        </div>
    );
};
