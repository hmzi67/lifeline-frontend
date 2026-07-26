import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Hash, Users, ToggleLeft, ToggleRight, Trash2, Pencil, Plus, BarChart2 } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CouponCode {
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
    createdBy?: { id: string; email: string; username: string | null } | null;
    _count?: { usages: number };
}

// ─── Service ──────────────────────────────────────────────────────────────────

const couponService = new CrudService<CouponCode>('/coupons');

// ─── Component ────────────────────────────────────────────────────────────────

const CouponComponent: React.FC = () => {
    const [coupons, setCoupons] = useState<CouponCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<CouponCode | null>(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await couponService.getAll({ limit: 100 });
            if (response.success && Array.isArray(response.data)) {
                setCoupons(response.data);
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const handleEdit = (coupon: CouponCode) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleDelete = async (coupon: CouponCode) => {
        if (!window.confirm(`Delete coupon "${coupon.code}"? This cannot be undone.`)) return;
        try {
            await couponService.delete(coupon.id);
            fetchCoupons();
        } catch (err: any) {
            setError(handleApiError(err));
        }
    };

    const handleToggleActive = async (coupon: CouponCode) => {
        try {
            await couponService.update(coupon.id, { isActive: !coupon.isActive });
            fetchCoupons();
        } catch (err: any) {
            setError(handleApiError(err));
        }
    };

    const handleSubmit = async (data: Record<string, any>) => {
        const payload = {
            code: String(data.code || '').toUpperCase(),
            description: data.description || undefined,
            discountPercent: Number(data.discountPercent) || 10,
            maxUses: Number(data.maxUses),
            isActive: data.isActive !== 'false',
            expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
        };

        if (editingCoupon) {
            await couponService.update(editingCoupon.id, payload);
        } else {
            await couponService.create(payload);
        }
        fetchCoupons();
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    // ─── Table Columns ────────────────────────────────────────────────────────

    const columns: Column<CouponCode>[] = [
        {
            key: 'code',
            label: 'Code',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Ticket className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-mono font-semibold text-gray-900 tracking-widest">{value}</span>
                </div>
            ),
        },
        {
            key: 'discountPercent',
            label: 'Discount',
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    {value}% OFF
                </span>
            ),
        },
        {
            key: 'currentUses',
            label: 'Usage',
            render: (value, row) => {
                const pct = Math.round((value / row.maxUses) * 100);
                const barColor = pct >= 100 ? 'bg-red-400' : pct >= 75 ? 'bg-orange-400' : 'bg-emerald-400';
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
        {
            key: 'createdAt',
            label: 'Created',
            render: (value) => (
                <span className="text-sm text-gray-500">{formatDate(value)}</span>
            ),
        },
    ];

    // ─── Form Fields ─────────────────────────────────────────────────────────

    const formFields: FormField[] = [
        {
            name: 'code',
            label: 'Coupon Code',
            type: 'text',
            required: true,
            placeholder: 'e.g. DOCTOR10',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            required: false,
            placeholder: 'Optional description for this coupon',
        },
        {
            name: 'discountPercent',
            label: 'Discount (%)',
            type: 'number',
            required: true,
            placeholder: '10',
        },
        {
            name: 'maxUses',
            label: 'Max Uses (Usage Limit)',
            type: 'number',
            required: true,
            placeholder: '100',
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
            label: 'Total Coupons',
            value: coupons.length,
            gradient: 'bg-gradient-to-br from-violet-100 to-purple-100',
        },
        {
            label: 'Active Coupons',
            value: coupons.filter((c) => c.isActive).length,
            gradient: 'bg-gradient-to-br from-green-100 to-emerald-100',
        },
        {
            label: 'Total Uses',
            value: coupons.reduce((sum, c) => sum + c.currentUses, 0),
            gradient: 'bg-gradient-to-br from-blue-100 to-cyan-100',
        },
        {
            label: 'Expired / Inactive',
            value: coupons.filter((c) => !c.isActive || (c.expiresAt && new Date(c.expiresAt) < new Date())).length,
            gradient: 'bg-gradient-to-br from-gray-100 to-slate-100',
        },
    ];

    return (
        <>
            <CrudTable
                data={coupons}
                columns={columns}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleCreate}
                title="Coupon Codes"
                description="Create and manage discount coupons for doctors and promoters (10% off)"
                icon={Ticket}
                searchPlaceholder="Search coupons..."
                emptyMessage="No coupons found. Create one to get started."
                stats={stats}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create New Coupon'}
                fields={formFields}
                initialData={
                    editingCoupon
                        ? {
                              code: editingCoupon.code,
                              description: editingCoupon.description || '',
                              discountPercent: editingCoupon.discountPercent,
                              maxUses: editingCoupon.maxUses,
                              expiresAt: editingCoupon.expiresAt
                                  ? new Date(editingCoupon.expiresAt).toISOString().split('T')[0]
                                  : '',
                              isActive: String(editingCoupon.isActive),
                          }
                        : { discountPercent: 10, isActive: 'true' }
                }
                submitLabel={editingCoupon ? 'Save Changes' : 'Create Coupon'}
            />
        </>
    );
};

export default CouponComponent;
