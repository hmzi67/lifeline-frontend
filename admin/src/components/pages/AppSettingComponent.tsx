import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';

interface AppSetting {
    id: string;
    key: string | null;
    value: string | null;
    scope: string | null;
}

const appSettingService = new CrudService<AppSetting>('/app-settings');

const AppSettingComponent: React.FC = () => {
    const [settings, setSettings] = useState<AppSetting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSetting, setEditingSetting] = useState<AppSetting | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await appSettingService.getAll();
            if (response.success && response.data) {
                setSettings(response.data);
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingSetting(null);
        setIsModalOpen(true);
    };

    const handleEdit = (setting: AppSetting) => {
        setEditingSetting(setting);
        setIsModalOpen(true);
    };

    const handleDelete = async (setting: AppSetting) => {
        if (!window.confirm(`Are you sure you want to delete the setting "${setting.key}"?`)) {
            return;
        }

        try {
            await appSettingService.delete(setting.id);
            fetchSettings();
        } catch (err: any) {
            alert(handleApiError(err));
        }
    };

    const handleSubmit = async (data: Record<string, any>) => {
        try {
            if (editingSetting) {
                await appSettingService.update(editingSetting.id, data);
            } else {
                await appSettingService.create(data);
            }
            fetchSettings();
        } catch (err: any) {
            throw new Error(handleApiError(err));
        }
    };

    // Group settings by scope
    const settingsByScope = settings.reduce((acc, setting) => {
        const scope = setting.scope || 'General';
        if (!acc[scope]) {
            acc[scope] = [];
        }
        acc[scope].push(setting);
        return acc;
    }, {} as Record<string, AppSetting[]>);

    const columns: Column<AppSetting>[] = [
        {
            key: 'key',
            label: 'Key',
            render: (value) => (
                <span className="font-mono text-sm font-medium text-gray-900">{value || '-'}</span>
            ),
        },
        {
            key: 'value',
            label: 'Value',
            render: (value) => (
                <span className="text-gray-600 max-w-md truncate block">{value || '-'}</span>
            ),
        },
        {
            key: 'scope',
            label: 'Scope',
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {value || 'General'}
                </span>
            ),
        },
    ];

    const formFields: FormField[] = [
        {
            name: 'key',
            label: 'Setting Key',
            type: 'text',
            required: true,
            placeholder: 'e.g., app.name, feature.enabled',
        },
        {
            name: 'value',
            label: 'Value',
            type: 'textarea',
            required: true,
            placeholder: 'Setting value',
            rows: 3,
        },
        {
            name: 'scope',
            label: 'Scope',
            type: 'text',
            placeholder: 'e.g., general, user, admin',
        },
    ];

    const stats = [
        {
            label: 'Total Settings',
            value: settings.length,
            gradient: 'bg-gradient-to-br from-purple-100 to-pink-100',
        },
        {
            label: 'Scopes',
            value: Object.keys(settingsByScope).length,
            gradient: 'bg-gradient-to-br from-blue-100 to-cyan-100',
        },
    ];

    return (
        <>
            <CrudTable
                data={settings}
                columns={columns}
                loading={loading}
                error={error}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="App Settings"
                description="Manage application configuration settings"
                icon={Settings}
                searchPlaceholder="Search settings..."
                emptyMessage="No settings found"
                stats={stats}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={editingSetting ? 'Edit Setting' : 'Add New Setting'}
                fields={formFields}
                initialData={editingSetting || {}}
                submitLabel={editingSetting ? 'Update' : 'Create'}
            />
        </>
    );
};

export default AppSettingComponent;
