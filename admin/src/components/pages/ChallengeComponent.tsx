import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';

interface Challenge {
    id: string;
    name: string | null;
    purpose: string | null;
    description: string | null;
    status: string | null;
}

const challengeService = new CrudService<Challenge>('/challenges');

const ChallengeComponent: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await challengeService.getAll();
            if (response.success) {
                // Handle both array and paginated response
                const data = response.data as any;
                if (Array.isArray(data)) {
                    setChallenges(data);
                } else if (data && Array.isArray(data.challenges)) {
                    setChallenges(data.challenges);
                } else {
                    console.error('Unexpected data format:', data);
                    setChallenges([]);
                }
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingChallenge(null);
        setIsModalOpen(true);
    };

    const handleEdit = (challenge: Challenge) => {
        setEditingChallenge(challenge);
        setIsModalOpen(true);
    };

    const handleDelete = async (challenge: Challenge) => {
        if (!window.confirm(`Are you sure you want to delete "${challenge.name}"?`)) {
            return;
        }

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
    ];

    const formFields: FormField[] = [
        {
            name: 'name',
            label: 'Challenge Name',
            type: 'text',
            required: true,
            placeholder: 'e.g., 30-Day Fitness Challenge',
        },
        {
            name: 'purpose',
            label: 'Purpose',
            type: 'textarea',
            placeholder: 'What is the goal of this challenge?',
            rows: 2,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Detailed description of the challenge',
            rows: 4,
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
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
    );
};

export default ChallengeComponent;
