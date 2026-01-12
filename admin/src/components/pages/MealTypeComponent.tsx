import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';

interface MealType {
    id: string;
    name: string;
    _count?: {
        dietPlanMeals: number;
    };
}

const mealTypeService = new CrudService<MealType>('/meal-types');

const MealTypeComponent: React.FC = () => {
    const [mealTypes, setMealTypes] = useState<MealType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMealType, setEditingMealType] = useState<MealType | null>(null);

    useEffect(() => {
        fetchMealTypes();
    }, []);

    const fetchMealTypes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await mealTypeService.getAll();
            if (response.success && response.data) {
                setMealTypes(response.data);
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingMealType(null);
        setIsModalOpen(true);
    };

    const handleEdit = (mealType: MealType) => {
        setEditingMealType(mealType);
        setIsModalOpen(true);
    };

    const handleDelete = async (mealType: MealType) => {
        if (!window.confirm(`Are you sure you want to delete "${mealType.name}"?`)) {
            return;
        }

        try {
            await mealTypeService.delete(mealType.id);
            fetchMealTypes();
        } catch (err: any) {
            alert(handleApiError(err));
        }
    };

    const handleSubmit = async (data: Record<string, any>) => {
        try {
            if (editingMealType) {
                await mealTypeService.update(editingMealType.id, data);
            } else {
                await mealTypeService.create(data);
            }
            fetchMealTypes();
        } catch (err: any) {
            throw new Error(handleApiError(err));
        }
    };

    const columns: Column<MealType>[] = [
        {
            key: 'name',
            label: 'Meal Type',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Utensils className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            ),
        },
        {
            key: '_count',
            label: 'Used in Meals',
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {value?.dietPlanMeals || 0} meals
                </span>
            ),
        },
    ];

    const formFields: FormField[] = [
        {
            name: 'name',
            label: 'Meal Type Name',
            type: 'text',
            required: true,
            placeholder: 'e.g., Breakfast, Lunch, Dinner, Snack',
        },
    ];

    const stats = [
        {
            label: 'Total Meal Types',
            value: mealTypes.length,
            gradient: 'bg-gradient-to-br from-green-100 to-emerald-100',
        },
    ];

    return (
        <>
            <CrudTable
                data={mealTypes}
                columns={columns}
                loading={loading}
                error={error}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="Meal Types"
                description="Manage meal type categories"
                icon={Utensils}
                searchPlaceholder="Search meal types..."
                emptyMessage="No meal types found"
                stats={stats}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={editingMealType ? 'Edit Meal Type' : 'Add New Meal Type'}
                fields={formFields}
                initialData={editingMealType || {}}
                submitLabel={editingMealType ? 'Update' : 'Create'}
            />
        </>
    );
};

export default MealTypeComponent;
