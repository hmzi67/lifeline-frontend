import { api, ENDPOINTS } from './api';
import type {
  AppSetting,
  AppSettingCreatePayload,
  AppSettingUpdatePayload,
  AppSettingsListResponse,
  AppSettingResponse,
} from '../types/progress.types';

export const appSettingsService = {
  /**
   * Get all app settings with pagination
   */
  getAllSettings: async (page: number = 1, limit: number = 10, scope?: string, key?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (scope) params.append('scope', scope);
    if (key) params.append('key', key);
    
    const response = await api.get<AppSettingsListResponse>(
      `${ENDPOINTS.APP_SETTINGS_LIST}?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get app setting by ID
   */
  getSettingById: async (id: string) => {
    const response = await api.get<AppSettingResponse>(
      ENDPOINTS.APP_SETTINGS_GET.replace(':id', id)
    );
    return response.data;
  },

  /**
   * Get app setting by key
   */
  getSettingByKey: async (key: string, scope?: string) => {
    const url = ENDPOINTS.APP_SETTINGS_BY_KEY.replace(':key', key);
    const params = scope ? `?scope=${scope}` : '';
    
    const response = await api.get<AppSettingResponse>(
      `${url}${params}`
    );
    return response.data;
  },

  /**
   * Create a new app setting
   */
  createSetting: async (payload: AppSettingCreatePayload) => {
    const response = await api.post<AppSettingResponse>(
      ENDPOINTS.APP_SETTINGS_CREATE,
      payload
    );
    return response.data;
  },

  /**
   * Update an existing app setting
   */
  updateSetting: async (id: string, payload: AppSettingUpdatePayload) => {
    const response = await api.put<AppSettingResponse>(
      ENDPOINTS.APP_SETTINGS_UPDATE.replace(':id', id),
      payload
    );
    return response.data;
  },

  /**
   * Delete an app setting
   */
  deleteSetting: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(
      ENDPOINTS.APP_SETTINGS_DELETE.replace(':id', id)
    );
    return response.data;
  },

  /**
   * Get settings by scope
   */
  getSettingsByScope: async (scope: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await api.get<AppSettingsListResponse>(
      `${ENDPOINTS.APP_SETTINGS_BY_SCOPE.replace(':scope', scope)}?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Bulk upsert app settings
   */
  bulkUpsertSettings: async (settings: Array<Partial<AppSetting>>) => {
    const response = await api.post<{
      success: boolean;
      message: string;
      results: Array<{ key: string; success: boolean; data?: AppSetting; message?: string }>;
    }>(
      ENDPOINTS.APP_SETTINGS_BULK_UPSERT,
      { settings }
    );
    return response.data;
  },
};
