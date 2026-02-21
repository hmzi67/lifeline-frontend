import React, { useState, useEffect } from 'react';
import { FolderOpen } from 'lucide-react';
import { CrudTable, type Column } from '@/components/shared/CrudTable';
import { FormModal, type FormField } from '@/components/shared/FormModal';
import { CrudService, handleApiError } from '@/services/crudService';

interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        blogs: number;
    };
}

const blogCategoryService = new CrudService<BlogCategory>('/blogs/categories');

const BlogCategoryComponent: React.FC = () => {
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await blogCategoryService.getAll();
            if (response.success && response.data) {
                setCategories(response.data);
            }
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (name: string): string => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category: BlogCategory) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (category: BlogCategory) => {
        if (!window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
            return;
        }

        try {
            await blogCategoryService.delete(category.id);
            fetchCategories();
        } catch (err: any) {
            alert(handleApiError(err));
        }
    };

    const handleSubmit = async (data: Record<string, any>) => {
        try {
            // Auto-generate slug if not provided
            if (!data.slug && data.name) {
                data.slug = generateSlug(data.name);
            }

            if (editingCategory) {
                await blogCategoryService.update(editingCategory.id, data);
            } else {
                await blogCategoryService.create(data);
            }
            fetchCategories();
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

    const columns: Column<BlogCategory>[] = [
        {
            key: 'name',
            label: 'Category Name',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <FolderOpen className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            ),
        },
        {
            key: 'slug',
            label: 'Slug',
            render: (value) => (
                <span className="font-mono text-sm text-gray-600">{value}</span>
            ),
        },
        {
            key: '_count',
            label: 'Blogs',
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {value?.blogs || 0} blogs
                </span>
            ),
        },
        {
            key: 'createdAt',
            label: 'Created',
            render: (value) => (
                <span className="text-sm text-gray-600">{formatDate(value)}</span>
            ),
        },
    ];

    const formFields: FormField[] = [
        {
            name: 'name',
            label: 'Category Name',
            type: 'text',
            required: true,
            placeholder: 'e.g., Health Tips, Nutrition, Fitness',
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            placeholder: 'Auto-generated from name if left empty',
        },
    ];

    const stats = [
        {
            label: 'Total Categories',
            value: categories.length,
            gradient: 'bg-gradient-to-br from-orange-100 to-red-100',
        },
        {
            label: 'Total Blogs',
            value: categories.reduce((sum, cat) => sum + (cat._count?.blogs || 0), 0),
            gradient: 'bg-gradient-to-br from-green-100 to-emerald-100',
        },
    ];

    return (
        <>
            <CrudTable
                data={categories}
                columns={columns}
                loading={loading}
                error={error}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="Blog Categories"
                description="Manage blog categories and organization"
                icon={FolderOpen}
                searchPlaceholder="Search categories..."
                emptyMessage="No categories found"
                stats={stats}
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
                fields={formFields}
                initialData={editingCategory || {}}
                submitLabel={editingCategory ? 'Update' : 'Create'}
            />
        </>
    );
};

export default BlogCategoryComponent;
