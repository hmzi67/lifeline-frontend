import React, { useState, useEffect } from 'react';
import { Shield, User, Mail, Calendar } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';
import api from '@/lib/axios';

interface Role {
    id: string;
    name: string;
    description: string | null;
}

interface UserWithRole {
    id: string;
    email: string;
    username: string | null;
    profileImage: string | null;
    roleId: string | null;
    createdAt: string;
    role?: {
        id: string;
        name: string;
    } | null;
}

const roleService = new CrudService<Role>('/roles');

const RoleComponent: React.FC = () => {
    const [users, setUsers] = useState<UserWithRole[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            // Fetch both users and roles
            const [usersResponse, rolesResponse] = await Promise.all([
                api.get<{ success: boolean; data: { users: UserWithRole[] } }>('/user/admin/users?limit=1000'),
                roleService.getAll()
            ]);

            if (usersResponse.data.success && usersResponse.data.data?.users) {
                setUsers(usersResponse.data.data.users);
            }
            if (rolesResponse.success && rolesResponse.data) {
                setRoles(rolesResponse.data);
            }
        } catch (err: any) {
            setError(handleApiError(err));
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: UserWithRole) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Record<string, any>) => {
        if (!editingUser) return;

        try {
            await api.put(`/user/admin/users/${editingUser.id}`, {
                roleId: data.roleId || null
            });
            fetchData();
        } catch (err: any) {
            throw new Error(handleApiError(err));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const columns: Column<UserWithRole>[] = [
        {
            key: 'email',
            label: 'User',
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    {row.profileImage ? (
                        <img
                            src={row.profileImage}
                            alt={row.username || row.email}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    )}
                    <div>
                        <div className="font-medium text-gray-900">
                            {row.username || 'No username'}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Mail className="w-3 h-3" />
                            {value}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            label: 'Role',
            render: (value) => {
                if (!value) {
                    return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            No Role
                        </span>
                    );
                }
                const roleColors: Record<string, string> = {
                    admin: 'bg-purple-100 text-purple-800',
                    user: 'bg-blue-100 text-blue-800',
                    moderator: 'bg-green-100 text-green-800',
                };
                const colorClass = roleColors[value.name?.toLowerCase()] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {value.name}
                    </span>
                );
            },
        },
        {
            key: 'createdAt',
            label: 'Joined',
            render: (value) => (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(value)}
                </div>
            ),
        },
    ];

    const formFields: FormField[] = [
        {
            name: 'roleId',
            label: 'Assign Role',
            type: 'select',
            required: false,
            options: [
                { value: '', label: 'No Role' },
                ...roles
                    .filter(role => role.name.toLowerCase() === 'admin')
                    .map(role => ({
                        value: role.id,
                        label: role.name
                    }))
            ],
        },
    ];

    const stats = [
        {
            label: 'Total Users',
            value: Array.isArray(users) ? users.length : 0,
            gradient: 'bg-gradient-to-br from-blue-100 to-cyan-100',
        },
        {
            label: 'Assigned Roles',
            value: Array.isArray(users) ? users.filter(u => u.roleId).length : 0,
            gradient: 'bg-gradient-to-br from-green-100 to-emerald-100',
        },
        {
            label: 'No Role',
            value: Array.isArray(users) ? users.filter(u => !u.roleId).length : 0,
            gradient: 'bg-gradient-to-br from-gray-100 to-slate-100',
        },
    ];

    return (
        <>
            <CrudTable
                data={users}
                columns={columns}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                title="User Role Management"
                description="Assign and manage user roles"
                icon={Shield}
                searchPlaceholder="Search users..."
                emptyMessage="No users found"
                stats={stats}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={`Update Role for ${editingUser?.username || editingUser?.email}`}
                fields={formFields}
                initialData={{ roleId: editingUser?.roleId || '' }}
                submitLabel="Update Role"
            />
        </>
    );
};

export default RoleComponent;
