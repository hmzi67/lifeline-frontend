import React, { useState, useEffect, useCallback } from 'react';
import {
    Target, CheckCircle, XCircle, Clock, AlertCircle,
    User, ChevronDown, ChevronUp, Loader2,
} from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';

interface Challenge {
    id: string;
    name: string | null;
    purpose: string | null;
    description: string | null;
    status: string | null;
    approvalStatus: string;
    rejectionReason: string | null;
    submittedById: string | null;
    submittedBy?: {
        id: string;
        username: string | null;
        email: string;
        profileImage: string | null;
    } | null;
}

const challengeService = new CrudService<Challenge>('/challenges');

// ── Approval badge ────────────────────────────────────────────────────────────
const ApprovalBadge: React.FC<{ status: string }> = ({ status }) => {
    const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
        PENDING: { label: 'Pending', cls: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
        APPROVED: { label: 'Approved', cls: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
        REJECTED: { label: 'Rejected', cls: 'bg-red-100 text-red-800', icon: <XCircle className="w-3 h-3" /> },
    };
    const cfg = map[status] ?? map['PENDING'];
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.cls}`}>
            {cfg.icon}{cfg.label}
        </span>
    );
};

// ── Reject modal ──────────────────────────────────────────────────────────────
const RejectModal: React.FC<{
    challenge: Challenge;
    onConfirm: (reason: string) => void;
    onCancel: () => void;
    loading: boolean;
}> = ({ challenge, onConfirm, onCancel, loading }) => {
    const [reason, setReason] = useState('');
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-xl"><XCircle className="w-5 h-5 text-red-600" /></div>
                    <h3 className="text-xl font-bold text-gray-900">Reject Challenge</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    Rejecting <span className="font-semibold">"{challenge.name}"</span>. Optionally provide a reason.
                </p>
                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={3}
                    placeholder="Reason for rejection (optional)…"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none resize-none text-sm"
                />
                <div className="flex justify-end gap-3 mt-5">
                    <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
                    <Button onClick={() => onConfirm(reason)} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
                        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                        Reject
                    </Button>
                </div>
            </div>
        </div>
    );
};

// ── Approval Requests Tab ─────────────────────────────────────────────────────
const ApprovalRequestsTab: React.FC = () => {
    const [pending, setPending] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [rejectingChallenge, setRejectingChallenge] = useState<Challenge | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchPending = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/challenges/approvals/pending');
            const data = res.data?.data;
            setPending(Array.isArray(data?.challenges) ? data.challenges : []);
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPending(); }, [fetchPending]);

    const handleApprove = async (challenge: Challenge) => {
        setActionLoading(challenge.id);
        try {
            await api.patch(`/challenges/${challenge.id}/approval`, { action: 'approve' });
            fetchPending();
        } catch (err: any) {
            alert(handleApiError(err));
        } finally {
            setActionLoading(null);
        }
    };

    const handleRejectConfirm = async (reason: string) => {
        if (!rejectingChallenge) return;
        setActionLoading(rejectingChallenge.id);
        try {
            await api.patch(`/challenges/${rejectingChallenge.id}/approval`, { action: 'reject', rejectionReason: reason });
            setRejectingChallenge(null);
            fetchPending();
        } catch (err: any) {
            alert(handleApiError(err));
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center space-y-3">
                    <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mx-auto" />
                    <p className="text-gray-500">Loading approval requests…</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {rejectingChallenge && (
                <RejectModal
                    challenge={rejectingChallenge}
                    onConfirm={handleRejectConfirm}
                    onCancel={() => setRejectingChallenge(null)}
                    loading={actionLoading === rejectingChallenge.id}
                />
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-5">
                    <p className="text-sm font-medium text-gray-600 mb-1">Pending Requests</p>
                    <p className="text-3xl font-bold text-gray-900">{pending.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-5">
                    <p className="text-sm font-medium text-gray-600 mb-1">User Submitted</p>
                    <p className="text-3xl font-bold text-gray-900">{pending.filter(c => c.submittedById).length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-5">
                    <p className="text-sm font-medium text-gray-600 mb-1">Awaiting Review</p>
                    <p className="text-3xl font-bold text-gray-900">{pending.length}</p>
                </div>
            </div>

            {pending.length === 0 ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-700 text-lg font-semibold">All caught up!</p>
                    <p className="text-gray-500 text-sm mt-1">No pending approval requests right now.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pending.map(challenge => {
                        const isExpanded = expandedId === challenge.id;
                        const isActioning = actionLoading === challenge.id;
                        return (
                            <div key={challenge.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-start justify-between p-5 gap-4">
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        <div className="p-2.5 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex-shrink-0">
                                            <Target className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-semibold text-gray-900">{challenge.name || '—'}</p>
                                                <ApprovalBadge status={challenge.approvalStatus} />
                                            </div>
                                            {challenge.purpose && (
                                                <p className="text-sm text-gray-500 mt-0.5 truncate">{challenge.purpose}</p>
                                            )}
                                            {challenge.submittedBy && (
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    {challenge.submittedBy.profileImage ? (
                                                        <img
                                                            src={challenge.submittedBy.profileImage}
                                                            alt={challenge.submittedBy.username ?? ''}
                                                            className="w-5 h-5 rounded-full object-cover"
                                                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                        />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <User className="w-3 h-3 text-gray-500" />
                                                        </div>
                                                    )}
                                                    <span className="text-xs text-gray-500">
                                                        Submitted by{' '}
                                                        <span className="font-medium text-gray-700">
                                                            {challenge.submittedBy.username ?? challenge.submittedBy.email}
                                                        </span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Button
                                            size="sm"
                                            onClick={() => handleApprove(challenge)}
                                            disabled={isActioning}
                                            className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                                        >
                                            {isActioning
                                                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                : <CheckCircle className="w-3.5 h-3.5" />
                                            }
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setRejectingChallenge(challenge)}
                                            disabled={isActioning}
                                            className="border-red-300 text-red-600 hover:bg-red-50 gap-1.5"
                                        >
                                            <XCircle className="w-3.5 h-3.5" />
                                            Reject
                                        </Button>
                                        <button
                                            onClick={() => setExpandedId(isExpanded ? null : challenge.id)}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                                        {challenge.description && (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</p>
                                                <p className="text-sm text-gray-700 leading-relaxed">{challenge.description}</p>
                                            </div>
                                        )}
                                        {challenge.submittedBy && (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Submitted By</p>
                                                <p className="text-sm text-gray-700">{challenge.submittedBy.email}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ChallengeComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'challenges' | 'approvals'>('challenges');
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        fetchChallenges();
        fetchPendingCount();
    }, []);

    const fetchChallenges = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await challengeService.getAll();
            if (response.success) {
                const data = response.data as any;
                if (Array.isArray(data)) {
                    setChallenges(data);
                } else if (data && Array.isArray(data.challenges)) {
                    setChallenges(data.challenges);
                } else {
                    setChallenges([]);
                }
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingCount = async () => {
        try {
            const res = await api.get('/challenges/approvals/pending');
            const data = res.data?.data;
            if (data) setPendingCount(data.total ?? data.challenges?.length ?? 0);
        } catch { /* silent */ }
    };

    const handleAdd = () => { setEditingChallenge(null); setIsModalOpen(true); };
    const handleEdit = (challenge: Challenge) => { setEditingChallenge(challenge); setIsModalOpen(true); };

    const handleDelete = async (challenge: Challenge) => {
        if (!window.confirm(`Are you sure you want to delete "${challenge.name}"?`)) return;
        try {
            await challengeService.delete(challenge.id);
            fetchChallenges();
        } catch (err: any) {
            alert(handleApiError(err));
        }
    };

    const handleSubmit = async (data: Record<string, any>) => {
        try {
            if (editingChallenge) {
                await challengeService.update(editingChallenge.id, data);
            } else {
                await challengeService.create(data);
            }
            fetchChallenges();
        } catch (err: any) {
            throw new Error(handleApiError(err));
        }
    };

    const columns: Column<Challenge>[] = [
        {
            key: 'name',
            label: 'Challenge Name',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <Target className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="font-medium text-gray-900">{value || '-'}</span>
                </div>
            ),
        },
        {
            key: 'purpose',
            label: 'Purpose',
            render: (value) => (
                <span className="text-gray-600 max-w-xs truncate block">{value || '-'}</span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => {
                const statusColors: Record<string, string> = {
                    active: 'bg-green-100 text-green-800',
                    inactive: 'bg-gray-100 text-gray-800',
                    draft: 'bg-blue-100 text-blue-800',
                    completed: 'bg-purple-100 text-purple-800',
                };
                const colorClass = statusColors[value?.toLowerCase() || ''] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                        {value || 'N/A'}
                    </span>
                );
            },
        },
        {
            key: 'approvalStatus',
            label: 'Approval',
            render: (value) => <ApprovalBadge status={value ?? 'APPROVED'} />,
        },
    ];

    const formFields: FormField[] = [
        { name: 'name', label: 'Challenge Name', type: 'text', required: true, placeholder: 'e.g., 30-Day Fitness Challenge' },
        { name: 'purpose', label: 'Purpose', type: 'textarea', placeholder: 'What is the goal of this challenge?', rows: 2 },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed description of the challenge', rows: 4 },
        {
            name: 'status', label: 'Status', type: 'select',
            options: [
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'DRAFT', label: 'Draft' },
                { value: 'COMPLETED', label: 'Completed' },
            ],
        },
    ];

    const stats = [
        {
            label: 'Total Challenges',
            value: Array.isArray(challenges) ? challenges.length : 0,
            gradient: 'bg-gradient-to-br from-yellow-100 to-orange-100',
        },
        {
            label: 'Active',
            value: Array.isArray(challenges) ? challenges.filter(c => c.status?.toLowerCase() === 'active').length : 0,
            gradient: 'bg-gradient-to-br from-green-100 to-emerald-100',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Tab bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1 w-fit">
                <button
                    onClick={() => setActiveTab('challenges')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                        ${activeTab === 'challenges'
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Target className="w-4 h-4" />
                    All Challenges
                </button>
                <button
                    onClick={() => { setActiveTab('approvals'); fetchPendingCount(); }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 relative
                        ${activeTab === 'approvals'
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Clock className="w-4 h-4" />
                    Approval Requests
                    {pendingCount > 0 && (
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
                            ${activeTab === 'approvals' ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'}`}>
                            {pendingCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Tab content */}
            {activeTab === 'challenges' ? (
                <>
                    <CrudTable
                        data={challenges}
                        columns={columns}
                        loading={loading}
                        error={error}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        title="Challenge Management"
                        description="Manage fitness and health challenges"
                        icon={Target}
                        searchPlaceholder="Search challenges..."
                        emptyMessage="No challenges found"
                        stats={stats}
                    />
                    <FormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSubmit}
                        title={editingChallenge ? 'Edit Challenge' : 'Add New Challenge'}
                        fields={formFields}
                        initialData={editingChallenge || {}}
                        submitLabel={editingChallenge ? 'Update' : 'Create'}
                    />
                </>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Approval Requests</h2>
                            <p className="text-gray-500">Review and approve user-submitted challenges</p>
                        </div>
                    </div>
                    <ApprovalRequestsTab />
                </div>
            )}
        </div>
    );
};

export default ChallengeComponent;
