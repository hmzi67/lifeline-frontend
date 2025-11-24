import React, { useState, useEffect } from 'react';
import { Dumbbell, Plus, Loader2, AlertCircle, Timer, Flame, Edit, Trash2, ImageIcon, FileText, Video, Target } from 'lucide-react';
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

interface UserExercise {
    user: User;
}

interface ChallengeExercise {
    challenge: Challenge;
}

interface Exercise {
    id: string;
    name: string;
    purpose: string | null;
    description: string | null;
    image: string | null;
    duration: string | null;
    videoUrl: string | null;
    difficulty: string | null;
    caloriesBurnEstimate: number | null;
    userExercises?: UserExercise[];
    challengeExercises?: ChallengeExercise[];
}

interface ApiResponse {
    success: boolean;
    data: Exercise[];
    message: string;
}

interface FormData {
    name: string;
    purpose: string;
    description: string;
    image: string;
    duration: string;
    videoUrl: string;
    difficulty: string;
    caloriesBurnEstimate: string;
}

const ExerciseComponent: React.FC = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");
    const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        purpose: '',
        description: '',
        image: '',
        duration: '',
        videoUrl: '',
        difficulty: '',
        caloriesBurnEstimate: ''
    });

    // Fetch exercises on component mount
    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get<ApiResponse>('/exercises');
            if (response.data.success && response.data.data) {
                setExercises(response.data.data);
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch exercises. Please try again later."
            );
            console.error('Error fetching exercises:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            purpose: '',
            description: '',
            image: '',
            duration: '',
            videoUrl: '',
            difficulty: '',
            caloriesBurnEstimate: ''
        });
        setEditingExercise(null);
        setSubmitError("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, difficulty: value }));
    };

    const handleEdit = (exercise: Exercise) => {
        setEditingExercise(exercise);
        setFormData({
            name: exercise.name || '',
            purpose: exercise.purpose || '',
            description: exercise.description || '',
            image: exercise.image || '',
            duration: exercise.duration || '',
            videoUrl: exercise.videoUrl || '',
            difficulty: exercise.difficulty || '',
            caloriesBurnEstimate: exercise.caloriesBurnEstimate?.toString() || ''
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
                purpose: formData.purpose || undefined,
                description: formData.description || undefined,
                image: formData.image || undefined,
                duration: formData.duration || undefined,
                videoUrl: formData.videoUrl || undefined,
                difficulty: formData.difficulty || undefined,
                caloriesBurnEstimate: formData.caloriesBurnEstimate ? parseInt(formData.caloriesBurnEstimate) : undefined
            };

            if (editingExercise) {
                // Update existing exercise
                await api.put(`/exercises/${editingExercise.id}`, submitData);
                setIsEditDialogOpen(false);
            } else {
                // Create new exercise
                await api.post('/exercises', submitData);
                setIsCreateDialogOpen(false);
            }

            resetForm();
            fetchExercises();
        } catch (err: any) {
            setSubmitError(
                err.response?.data?.message ||
                `Failed to ${editingExercise ? 'update' : 'create'} exercise. Please try again.`
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this exercise?')) {
            return;
        }

        try {
            await api.delete(`/exercises/${id}`);
            fetchExercises();
        } catch (err: any) {
            console.error('Error deleting exercise:', err);
            alert('Failed to delete exercise. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto" />
                    <p className="text-gray-600">Loading exercises...</p>
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
                        <div className="p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl">
                            <Dumbbell className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Exercise Management</h2>
                            <p className="text-gray-500">Manage all exercises</p>
                        </div>
                    </div>

                    {/* Create Dialog */}
                    <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
                        setIsCreateDialogOpen(open);
                        if (!open) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                <Plus className="w-5 h-5 mr-2" />
                                Add Exercise
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Add New Exercise</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="create-name">Exercise Name *</Label>
                                    <Input
                                        id="create-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Push-ups"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create-purpose">Purpose (Optional)</Label>
                                    <Input
                                        id="create-purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Upper body strength"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create-description">Description (Optional)</Label>
                                    <Textarea
                                        id="create-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the exercise, its benefits, and proper form..."
                                        rows={4}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="create-duration">Duration (Optional)</Label>
                                        <Input
                                            id="create-duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 30 min"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="create-difficulty">Difficulty (Optional)</Label>
                                        <Select value={formData.difficulty} onValueChange={handleSelectChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Beginner">Beginner</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="create-calories">Calories Burn Estimate (Optional)</Label>
                                    <Input
                                        type="number"
                                        id="create-calories"
                                        name="caloriesBurnEstimate"
                                        value={formData.caloriesBurnEstimate}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 250"
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

                                <div className="space-y-2">
                                    <Label htmlFor="create-video">Video URL (Optional)</Label>
                                    <Input
                                        id="create-video"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/video.mp4"
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
                                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                                        disabled={submitLoading}
                                    >
                                        {submitLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            'Save Exercise'
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
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Edit Exercise</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Exercise Name *</Label>
                                    <Input
                                        id="edit-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Push-ups"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-purpose">Purpose (Optional)</Label>
                                    <Input
                                        id="edit-purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Upper body strength"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-description">Description (Optional)</Label>
                                    <Textarea
                                        id="edit-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the exercise, its benefits, and proper form..."
                                        rows={4}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-duration">Duration (Optional)</Label>
                                        <Input
                                            id="edit-duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 30 min"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-difficulty">Difficulty (Optional)</Label>
                                        <Select value={formData.difficulty} onValueChange={handleSelectChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Beginner">Beginner</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-calories">Calories Burn Estimate (Optional)</Label>
                                    <Input
                                        type="number"
                                        id="edit-calories"
                                        name="caloriesBurnEstimate"
                                        value={formData.caloriesBurnEstimate}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 250"
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

                                <div className="space-y-2">
                                    <Label htmlFor="edit-video">Video URL (Optional)</Label>
                                    <Input
                                        id="edit-video"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/video.mp4"
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
                                            'Update Exercise'
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

                {/* Exercise Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Exercises</h3>
                        <p className="text-3xl font-bold text-gray-900">{exercises.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Active Users</h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {exercises.reduce((acc, exercise) => acc + (exercise.userExercises?.length || 0), 0)}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Challenge Exercises</h3>
                        <p className="text-3xl font-bold text-gray-900">
                            {exercises.reduce((acc, exercise) => acc + (exercise.challengeExercises?.length || 0), 0)}
                        </p>
                    </div>
                </div>

                {/* Exercises Table */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">All Exercises</h3>
                    {exercises.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg overflow-hidden">
                                <thead className="bg-gradient-to-r from-red-100 to-orange-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Exercise Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Purpose
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Difficulty
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Calories
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
                                    {exercises.map((exercise) => (
                                        <tr key={exercise.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {exercise.image ? (
                                                        <img
                                                            src={exercise.image}
                                                            alt={exercise.name || 'Exercise'}
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
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{exercise.name}</div>
                                                        {exercise.videoUrl && (
                                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Video className="w-3 h-3" />
                                                                <span>Video available</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {exercise.purpose ? (
                                                    <div className="flex items-center gap-1">
                                                        <Target className="w-4 h-4 text-purple-500" />
                                                        <span className="text-sm text-gray-900">{exercise.purpose}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {exercise.duration ? (
                                                    <div className="flex items-center gap-1">
                                                        <Timer className="w-4 h-4 text-blue-500" />
                                                        <span className="text-sm text-gray-900">{exercise.duration}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {exercise.difficulty ? (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                            exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {exercise.difficulty}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {exercise.caloriesBurnEstimate ? (
                                                    <div className="flex items-center gap-1">
                                                        <Flame className="w-4 h-4 text-orange-500" />
                                                        <span className="text-sm text-gray-900">{exercise.caloriesBurnEstimate} kcal</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    {exercise.userExercises?.length || 0} users
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        onClick={() => handleEdit(exercise)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleDelete(exercise.id)}
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
                            <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No exercises available</p>
                            <p className="text-gray-400 text-sm mt-2">Create your first exercise to get started</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseComponent;
