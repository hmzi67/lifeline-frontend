import React, { useEffect, useState } from 'react';
import { Users, Plus, User, Mail, Calendar, Activity } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@radix-ui/react-select';
import type { UserProfile } from '@/types/user.types';


const UsersComponent: React.FC = () => {
    const { users, loading, error, fetchUsers } = useUserStore();
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Update handleUserClick parameter type
    const handleUserClick = (user: UserProfile) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };


    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading users...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error: {error}</div>
        </div>
    );

    return (
        <div className="space-y-8 p-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl">Users Management</CardTitle>
                                <CardDescription className="text-lg">
                                    Manage and monitor user activities
                                </CardDescription>
                            </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users?.map((user) => (
                            <Card
                                key={user.id}
                                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                                onClick={() => handleUserClick(user)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={user.profileImage} alt={user.username} />
                                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                                                {user.username?.charAt(0)?.toUpperCase() || <User className="w-6 h-6" />}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-lg truncate">{user.username}</CardTitle>
                                            <CardDescription className="truncate">{user.email}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-3">
                                        
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Last Active</span>
                                            <span className="font-medium">{user.createdAt}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={selectedUser?.profileImage} alt={selectedUser?.username} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                                    {selectedUser?.username?.charAt(0)?.toUpperCase() || <User className="w-6 h-6" />}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-xl font-semibold">{selectedUser?.username}</div>
                                <div className="text-sm text-gray-500 font-normal">User Details</div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Separator />

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <div className="text-sm font-medium">Email</div>
                                    <div className="text-sm text-gray-600">{selectedUser?.email}</div>
                                </div>
                            </div>

                            
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <div>
                                    <div className="text-sm font-medium">Last Active</div>
                                    <div className="text-sm text-gray-600">{selectedUser?.createdAt}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                <div>
                                    <div className="text-sm font-medium">User ID</div>
                                    <div className="text-sm text-gray-600 font-mono">{selectedUser?.id}</div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                Edit User
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                                View Activity
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UsersComponent;