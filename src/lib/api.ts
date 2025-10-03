const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Types
export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user: {
            id: string;
            username: string;
            role: string;
            lastLogin: string;
        };
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
    };
}

export interface ContentResponse {
    success: boolean;
    data: Record<string, unknown> | null;
    message?: string;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{ msg: string; param?: string }>;
}

// Storage utilities
class TokenStorage {
    static getAccessToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('accessToken');
    }

    static getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refreshToken');
    }

    static setTokens(accessToken: string, refreshToken: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    static clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');
    }

    static setUserInfo(user: { id: string; username: string; role: string; lastLogin: string }): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    static getUserInfo(): { id: string; username: string; role: string; lastLogin: string } | null {
        if (typeof window === 'undefined') return null;
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    }
}

// HTTP client with automatic token handling
class ApiClient {
    private async makeRequest(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<Response> {
        const url = `${API_BASE_URL}${endpoint}`;
        const accessToken = TokenStorage.getAccessToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers as Record<string, string>,
        };

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Handle token refresh if access token expired
        if (response.status === 401 && accessToken) {
            const refreshed = await this.refreshTokens();
            if (refreshed) {
                // Retry with new token
                headers['Authorization'] = `Bearer ${TokenStorage.getAccessToken()}`;
                return fetch(url, { ...options, headers });
            } else {
                // Refresh failed, redirect to login
                TokenStorage.clearTokens();
                if (typeof window !== 'undefined') {
                    window.location.href = '/nadia';
                }
            }
        }

        return response;
    }

    private async refreshTokens(): Promise<boolean> {
        try {
            const refreshToken = TokenStorage.getRefreshToken();
            if (!refreshToken) return false;

            const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const data: AuthResponse = await response.json();
                if (data.success && data.data) {
                    TokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
                    return true;
                }
            }

            return false;
        } catch {
            return false;
        }
    }

    async get(endpoint: string): Promise<Record<string, unknown>> {
        const response = await this.makeRequest(endpoint, {
            method: 'GET',
        });

        return response.json();
    }

    async post(endpoint: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
        const response = await this.makeRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        return response.json();
    }

    async put(endpoint: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
        const response = await this.makeRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        return response.json();
    }

    async patch(endpoint: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
        const response = await this.makeRequest(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });

        return response.json();
    }

    async delete(endpoint: string): Promise<Record<string, unknown>> {
        const response = await this.makeRequest(endpoint, {
            method: 'DELETE',
        });

        return response.json();
    }
}

const apiClient = new ApiClient();

// Auth API
export const authApi = {
    async login(username: string, password: string): Promise<AuthResponse> {
        try {
            const response = await apiClient.post('/auth/login', {
                username,
                password,
            }) as unknown as AuthResponse;

            if (response.success && response.data) {
                TokenStorage.setTokens(
                    response.data.accessToken,
                    response.data.refreshToken
                );
                TokenStorage.setUserInfo(response.data.user);
            }

            return response;
        } catch {
            return {
                success: false,
                message: 'Network error occurred',
            };
        }
    },

    async logout(): Promise<void> {
        try {
            const refreshToken = TokenStorage.getRefreshToken();
            if (refreshToken) {
                await apiClient.post('/auth/logout', { refreshToken });
            }
        } finally {
            TokenStorage.clearTokens();
        }
    },

    async getCurrentUser(): Promise<{ success: boolean; message?: string; data?: { user: { id: string; username: string; role: string; lastLogin: string } } }> {
        try {
            return await apiClient.get('/auth/me') as { success: boolean; message?: string; data?: { user: { id: string; username: string; role: string; lastLogin: string } } };
        } catch {
            return { success: false, message: 'Failed to get user info' };
        }
    },

    isLoggedIn(): boolean {
        return !!TokenStorage.getAccessToken();
    },

    getUserInfo(): { id: string; username: string; role: string; lastLogin: string } | null {
        return TokenStorage.getUserInfo();
    },
};

// Content API
export const contentApi = {
    async getContent(): Promise<ContentResponse> {
        try {
            return await apiClient.get('/content') as unknown as ContentResponse;
        } catch {
            return {
                success: false,
                data: null,
                message: 'Failed to fetch content',
            };
        }
    },

    async updateContent(content: Record<string, unknown>): Promise<ContentResponse> {
        try {
            return await apiClient.put('/content', content) as unknown as ContentResponse;
        } catch {
            return {
                success: false,
                data: null,
                message: 'Failed to update content',
            };
        }
    },

    async updateSection(section: string, data: Record<string, unknown>): Promise<ContentResponse> {
        try {
            return await apiClient.patch(`/content/section/${section}`, data) as unknown as ContentResponse;
        } catch {
            return {
                success: false,
                data: null,
                message: 'Failed to update section',
            };
        }
    },

    async getBackups(): Promise<{ success: boolean; message?: string; data?: unknown[] }> {
        try {
            return await apiClient.get('/content/backups') as { success: boolean; message?: string; data?: unknown[] };
        } catch {
            return {
                success: false,
                message: 'Failed to fetch backups',
            };
        }
    },

    async restoreBackup(backupId: string): Promise<ContentResponse> {
        try {
            return await apiClient.post(`/content/restore/${backupId}`, {}) as unknown as ContentResponse;
        } catch {
            return {
                success: false,
                data: null,
                message: 'Failed to restore backup',
            };
        }
    },
};

export { TokenStorage };