import api from '@/lib/axios';

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    message?: string;
}

/**
 * Generic CRUD API service
 * Provides reusable functions for Create, Read, Update, Delete operations
 */
export class CrudService<T> {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Get all records
     */
    async getAll(params?: Record<string, any>): Promise<ApiResponse<T[]>> {
        const response = await api.get<ApiResponse<T[]>>(this.endpoint, { params });
        return response.data;
    }

    /**
     * Get a single record by ID
     */
    async getById(id: string): Promise<ApiResponse<T>> {
        const response = await api.get<ApiResponse<T>>(`${this.endpoint}/${id}`);
        return response.data;
    }

    /**
     * Create a new record
     */
    async create(data: Partial<T>): Promise<ApiResponse<T>> {
        const response = await api.post<ApiResponse<T>>(this.endpoint, data);
        return response.data;
    }

    /**
     * Update an existing record
     */
    async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
        const response = await api.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
        return response.data;
    }

    /**
     * Delete a record
     */
    async delete(id: string): Promise<ApiResponse<void>> {
        const response = await api.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
        return response.data;
    }

    /**
     * Custom GET request to a specific path
     */
    async customGet<R = any>(path: string, params?: Record<string, any>): Promise<ApiResponse<R>> {
        const response = await api.get<ApiResponse<R>>(`${this.endpoint}${path}`, { params });
        return response.data;
    }

    /**
     * Custom POST request to a specific path
     */
    async customPost<R = any>(path: string, data: any): Promise<ApiResponse<R>> {
        const response = await api.post<ApiResponse<R>>(`${this.endpoint}${path}`, data);
        return response.data;
    }
}

/**
 * Upload file to server
 */
export const uploadFile = async (file: File, endpoint: string = '/upload'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiResponse<{ url: string }>>(endpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.data.url;
};

/**
 * Handle API errors consistently
 */
export const handleApiError = (error: any): string => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.message) {
        return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
};
