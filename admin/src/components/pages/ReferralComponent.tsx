import React, { useState, useEffect } from 'react';
import { Link2, Calendar, Users, ToggleLeft, ToggleRight, UserCheck } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';
import api from '@/lib/axios';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReferralCode {
    id: string;
    code: string;
    description: string | null;
    discountPercent: number;
    maxUses: number;
    currentUses: number;
    isActive: boolean;
    expiresAt: string | null;
    createdAt: string;
    updatedAt: string;
    referrer: { id: string; email: string; username: string | null };
    _count?: { usages: number };
}

interface AdminUser {
    id: string;
    email: string;
    username: string | null;
}

// ─── Service ──────────────────────────────────────────────────────────────────

const referralService = new CrudService<ReferralCode>('/referral-codes');

// ─── Component ────────────────────────────────────────────────────────────────

const ReferralComponent: React.FC = () => {
    const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
    const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCode, setEditingCode] = useState<ReferralCode | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const [refResponse, usersResponse] = await Promise.all([
                referralService.getAll({ limit: 100 }),
                api.get<{ success: boolean; data: { users: AdminUser[] } }>('/user/admin/users?limit=1000'),
            ]);

            if (refResponse.success && Array.isArray(refResponse.data)) {
                setReferralCodes(refResponse.data);
            }
            if (usersResponse.data.success && usersResponse.data.data?.users) {
                setAllUsers(usersResponse.data.data.users);
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingCode(null);
        setIsModalOpen(true);
    };

    const handleEdit = (code: ReferralCode) => {
        setEditingCode(code);
        setIsModalOpen(true);
    };

    const handleDelete = async (code: ReferralCode) => {
        if (!window.confirm(`Delete referral code "${code.code}"? This cannot be undone.`)) return;
        try {
            await referralService.delete(code.id);
            fetchData();
        } catch (err: any) {
            setError(handleApiError(err));
        }
    };

    const handleToggleActive = async (code: ReferralCode) => {
        try {
            await referralService.update(code.id, { isActive: !code.isActive });
            fetchData();
        } catch (err: any) {
            setError(handleApiError(err));
        }
    };

    const handleSubmit = async (data: Record<string, any>) => {
        const payload = {
            code: String(data.code || '').toUpperCase(),
            referrerId: data.referrerId,
            description: data.description || undefined,
            discountPercent: Number(data.discountPercent) || 10,
            maxUses: Number(data.maxUses),
            isActive: data.isActive !== 'false',
            expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
        };

        if (editingCode) {
            await referralService.update(editingCode.id, payload);
        } else {
            await referralService.create(payload);
        }
        fetchData();
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    // ─── Table Columns ────────────────────────────────────────────────────────

    const columns: Column<ReferralCode>[] = [
        {
            key: 'code',
            label: 'Referral Code',
            render: (value, row) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <Link2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <span className="font-mono font-semibold text-gray-900 tracking-widest">{value}</span>
                        {row.description && (
                            <div className="text-xs text-gray-400 truncate max-w-[160px]">{row.description}</div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: 'referrer',
            label: 'Assigned To (Doctor)',
            render: (referrer) => (
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {referrer?.username || '—'}
                        </div>
                        <div className="text-xs text-gray-400">{referrer?.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'discountPercent',
            label: 'Discount',
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-700">
                    {value}% OFF
                </span>
            ),
        },
        {
            key: 'currentUses',
            label: 'Usage',
            render: (value, row) => {
                const pct = Math.round((value / row.maxUses) * 100);
                const barColor = pct >= 100 ? 'bg-red-400' : pct >= 75 ? 'bg-orange-400' : 'bg-cyan-400';
                return (
                    <div className="w-32">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{value} / {row.maxUses}</span>
                            <span>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'isActive',
            label: 'Status',
            render: (value, row) => (
                <button
                    type="button"
                    onClick={() => handleToggleActive(row)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        value
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    {value ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                    {value ? 'Active' : 'Inactive'}
                </button>
            ),
        },
        {
            key: 'expiresAt',
            label: 'Expires',
            render: (value) => (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(value)}
                </div>
            ),
        },
    ];

    // ─── Form Fields ─────────────────────────────────────────────────────────

    const formFields: FormField[] = [
        {
            name: 'code',
            label: 'Referral Code',
            type: 'text',
            required: true,
            placeholder: 'e.g. DR-SMITH-10',
            disabled: !!editingCode, // code cannot change after creation
        },
        {
            name: 'referrerId',
            label: 'Assign to Doctor / Referrer',
            type: 'select',
            required: true,
            options: allUsers.map((u) => ({
                value: u.id,
                label: u.username ? `${u.username} (${u.email})` : u.email,
            })),
        },
        {
            name: 'description',
            label: 'Description (optional)',
            type: 'text',
            required: false,
            placeholder: 'e.g. Referred by Dr. Smith',
        },
        {
            name: 'discountPercent',
            label: 'Discount (%)',
            type: 'number',
            required: true,
            placeholder: '10',
            min: 1,
            max: 100,
        },
        {
            name: 'maxUses',
            label: 'Max Uses (Usage Limit)',
            type: 'number',
            required: true,
            placeholder: '50',
            min: 1,
        },
        {
            name: 'expiresAt',
            label: 'Expiry Date (optional)',
            type: 'date',
            required: false,
        },
        {
            name: 'isActive',
            label: 'Status',
            type: 'select',
            required: false,
            options: [
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' },
            ],
        },
    ];

    // ─── Stats ────────────────────────────────────────────────────────────────

    const stats = [
        {
            label: 'Total Referral Codes',
            value: referralCodes.length,
            gradient: 'bg-gradient-to-br from-cyan-100 to-blue-100',
        },
        {
            label: 'Active Codes',
            value: referralCodes.filter((r) => r.isActive).length,
            gradient: 'bg-gradient-to-br from-green-100 to-teal-100',
        },
        {
            label: 'Total Referrals Used',
            value: referralCodes.reduce((sum, r) => sum + r.currentUses, 0),
            gradient: 'bg-gradient-to-br from-violet-100 to-purple-100',
        },
        {
            label: 'Unique Doctors',
            value: new Set(referralCodes.map((r) => r.referrer?.id)).size,
            gradient: 'bg-gradient-to-br from-orange-100 to-amber-100',
        },
    ];

    return (
        <>
            <CrudTable
                data={referralCodes}
                columns={columns}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleCreate}
                title="Referral Codes"
                description="Create referral codes for doctors — each referred user gets 10% off their first payment"
                icon={Link2}
                searchPlaceholder="Search referral codes..."
                emptyMessage="No referral codes found. Create one for a doctor."
                stats={stats}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={editingCode ? `Edit Referral Code: ${editingCode.code}` : 'Create New Referral Code'}
                fields={formFields}
                initialData={
                    editingCode
                        ? {
                              code: editingCode.code,
                              referrerId: editingCode.referrer?.id || '',
                              description: editingCode.description || '',
                              discountPercent: editingCode.discountPercent,
                              maxUses: editingCode.maxUses,
                              expiresAt: editingCode.expiresAt
                                  ? new Date(editingCode.expiresAt).toISOString().split('T')[0]
                                  : '',
                              isActive: String(editingCode.isActive),
                          }
                        : { discountPercent: 10, isActive: 'true' }
                }
                submitLabel={editingCode ? 'Save Changes' : 'Create Referral Code'}
            />
        </>
    );
};

export default ReferralComponent;
