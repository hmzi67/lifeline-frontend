import React, { useState, useEffect } from 'react';
import { Package, Plus, Loader2, AlertCircle, Calendar, Flame, Edit, Trash2, ImageIcon, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/axios';

interface User {
    id: string;
    email: string;
    username: string;
}

interface Challenge {
    id: string;
    name: string;
    status: string;
}

interface UserDietPlan {
    user: User;
}

interface ChallengeDiet {
    challenge: Challenge;
}

interface DietPlan {
    id: string;
    name: string;
    calories: number | null;
    duration: string | null;
    description: string | null;
    image: string | null;
    createdAt?: string;
    updatedAt?: string;
    userDietPlans?: UserDietPlan[];
    challengeDiets?: ChallengeDiet[];
}

interface ApiResponse {
    success: boolean;
    data: DietPlan[];
    message: string;
}

interface FormData {
    name: string;
    calories: string;
    durationNumber: string;
    durationType: string;
    description: string;
    image: string;
}

const DietComponent: React.FC = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");
    const [editingPlan, setEditingPlan] = useState<DietPlan | null>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        calories: '',
        durationNumber: '',
        durationType: '',
        description: '',
        image: ''
    });

    // Fetch diet plans on component mount
    useEffect(() => {
        fetchDietPlans();
    }, []);

    const fetchDietPlans = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get<ApiResponse>('/diet-plans');
            if (response.data.success && response.data.data) {
                setDietPlans(response.data.data);
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch diet plans. Please try again later."
            );
            console.error('Error fetching diet plans:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            calories: '',
            durationNumber: '',
            durationType: '',
            description: '',
            image: ''
        });
        setEditingPlan(null);
        setSubmitError("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, durationType: value }));
    };

    const handleEdit = (plan: DietPlan) => {
        setEditingPlan(plan);

        // Parse duration
        const durationParts = plan.duration?.split(' ') || [];
        const durationNumber = durationParts[0] || '';
        const durationType = durationParts[1] || '';

        setFormData({
            name: plan.name || '',
            calories: plan.calories?.toString() || '',
            durationNumber,
            durationType,
            description: plan.description || '',
            image: plan.image || ''
        });
        setIsEditDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");
        setSubmitLoading(true);

        try {
            const submitData = {
                name: formData.name,
                calories: formData.calories ? parseInt(formData.calories) : undefined,
                duration: formData.durationNumber && formData.durationType
                    ? `${formData.durationNumber} ${formData.durationType}`
                    : undefined,
                description: formData.description || undefined,
                image: formData.image || undefined
            };

            if (editingPlan) {
                // Update existing plan
                await api.put(`/diet-plans/${editingPlan.id}`, submitData);
                setIsEditDialogOpen(false);
            } else {
                // Create new plan
                await api.post('/diet-plans', submitData);
                setIsCreateDialogOpen(false);
            }

            resetForm();
            fetchDietPlans();
        } catch (err: any) {
            setSubmitError(
                err.response?.data?.message ||
                `Failed to ${editingPlan ? 'update' : 'create'} diet plan. Please try again.`
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this diet plan?')) {
            return;
        }

        try {
            await api.delete(`/diet-plans/${id}`);
            fetchDietPlans();
        } catch (err: any) {
            console.error('Error deleting diet plan:', err);
            alert('Failed to delete diet plan. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto" />
                    <p className="text-gray-600">Loading diet plans...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Diet Management</h2>
                            <p className="text-gray-500">Manage all diet plans</p>
                        </div>
                    </div>

                    {/* Create Dialog */}
                    <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
                        setIsCreateDialogOpen(open);
                        if (!open) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                <Plus className="w-5 h-5 mr-2" />
                                Add Diet Plan
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Add New Diet Plan</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="create-name">Diet Plan Name *</Label>
                                    <Input
                                        id="create-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mediterranean Diet Plan"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create-calories">Daily Calories (Optional)</Label>
                                    <Input
                                        type="number"
                                        id="create-calories"
                                        name="calories"
                                        value={formData.calories}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Duration (Optional)</Label>
                                    <div className="flex gap-3">
                                        <Input
                                            type="number"
                                            name="durationNumber"
                                            value={formData.durationNumber}
                                            onChange={handleInputChange}
                                            placeholder="30"
                                            className="flex-1"
                                        />
                                        <Select value={formData.durationType} onValueChange={handleSelectChange}>
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="day">Day</SelectItem>
                                                <SelectItem value="days">Days</SelectItem>
                                                <SelectItem value="week">Week</SelectItem>
                                                <SelectItem value="weeks">Weeks</SelectItem>
                                                <SelectItem value="month">Month</SelectItem>
                                                <SelectItem value="months">Months</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create-description">Description (Optional)</Label>
                                    <Textarea
                                        id="create-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the diet plan, its benefits, and target audience..."
                                        rows={4}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create-image">Image URL (Optional)</Label>
                                    <Input
                                        id="create-image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {submitError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{submitError}</p>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1"
                                            disabled={submitLoading}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                        disabled={submitLoading}
                                    >
                                        {submitLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            'Save Diet Plan'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Dialog */}
                    <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) resetForm();
                    }}>
                        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Edit Diet Plan</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Diet Plan Name *</Label>
                                    <Input
                                        id="edit-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mediterranean Diet Plan"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-calories">Daily Calories (Optional)</Label>
                                    <Input
                                        type="number"
                                        id="edit-calories"
                                        name="calories"
                                        value={formData.calories}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Duration (Optional)</Label>
                                    <div className="flex gap-3">
                                        <Input
                                            type="number"
                                            name="durationNumber"
                                            value={formData.durationNumber}
                                            onChange={handleInputChange}
                                            placeholder="30"
                                            className="flex-1"
                                        />
                                        <Select value={formData.durationType} onValueChange={handleSelectChange}>
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="day">Day</SelectItem>
                                                <SelectItem value="days">Days</SelectItem>
                                                <SelectItem value="week">Week</SelectItem>
                                                <SelectItem value="weeks">Weeks</SelectItem>
                                                <SelectItem value="month">Month</SelectItem>
                                                <SelectItem value="months">Months</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-description">Description (Optional)</Label>
                                    <Textarea
                                        id="edit-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the diet plan, its benefits, and target audience..."
                                        rows={4}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-image">Image URL (Optional)</Label>
                                    <Input
                                        id="edit-image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {submitError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{submitError}</p>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1"
                                            disabled={submitLoading}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                                        disabled={submitLoading}
                                    >
                                        {submitLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Diet Plan'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-sm font-medium text-red-600">{error}</p>
                        </div>
                    </div>
                )}

                {/* Diet Plans Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Diet Plans</h3>
                        <p className="text-3xl font-bold text-gray-900">{dietPlans.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Active Users</h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {dietPlans.reduce((acc, plan) => acc + (plan.userDietPlans?.length || 0), 0)}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Challenge Diets</h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {dietPlans.reduce((acc, plan) => acc + (plan.challengeDiets?.length || 0), 0)}
                        </p>
                    </div>
                </div>

                {/* Diet Plans Table */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">All Diet Plans</h3>
                    {dietPlans.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg overflow-hidden">
                                <thead className="bg-gradient-to-r from-green-100 to-emerald-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Plan Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Calories
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Active Users
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {dietPlans.map((plan) => (
                                        <tr key={plan.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {plan.image ? (
                                                        <img
                                                            src={plan.image}
                                                            alt={plan.name || 'Diet plan'}
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                            <ImageIcon className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    {plan.calories ? (
                                                        <>
                                                            <Flame className="w-4 h-4 text-orange-500" />
                                                            <span className="text-sm text-gray-900">{plan.calories} kcal</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    {plan.duration ? (
                                                        <>
                                                            <Calendar className="w-4 h-4 text-blue-500" />
                                                            <span className="text-sm text-gray-900">{plan.duration}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {plan.description ? (
                                                    <div className="flex items-start gap-1 max-w-xs">
                                                        <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600 line-clamp-2">{plan.description}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {plan.userDietPlans?.length || 0} users
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        onClick={() => handleEdit(plan)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleDelete(plan.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-12 text-center">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No diet plans available</p>
                            <p className="text-gray-400 text-sm mt-2">Create your first diet plan to get started</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DietComponent;