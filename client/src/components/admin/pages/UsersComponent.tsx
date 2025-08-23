import React, { useEffect, useState, useMemo } from 'react';
import {
    Users,
    Plus,
    User,
    Mail,
    Calendar,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Eye,
    Trash2,
    ChevronDown,
    ChevronUp,
    UserCheck,
    UserX,
    ArrowUpDown
} from 'lucide-react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/react-table';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { UserProfile } from '@/types/user.types';

const columnHelper = createColumnHelper<UserProfile>();

const UsersComponent: React.FC = () => {
    const { users, loading, error, fetchUsers } = useUserStore();
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserClick = (user: UserProfile) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    const getStatusBadge = (user: UserProfile) => {
        // Mock status - you can implement real logic based on your data
        const isActive = Math.random() > 0.3;
        return isActive ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                <UserCheck className="w-3 h-3 mr-1" />
                Active
            </Badge>
        ) : (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <UserX className="w-3 h-3 mr-1" />
                Inactive
            </Badge>
        );
    };

    const columns = useMemo(
        () => [
            columnHelper.accessor('username', {
                id: 'user',
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className="h-auto p-0 font-semibold hover:bg-transparent flex items-center"
                        >
                            User
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }) => {
                    const user = row.original;
                    return (
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={user.profileImage} alt={user.username} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm">
                                    {user.username?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <div className="font-semibold text-gray-900 truncate">
                                    {user.username}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                    ID: {user.id}
                                </div>
                            </div>
                        </div>
                    );
                },
                size: 300,
            }),
            columnHelper.accessor('email', {
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className="h-auto p-0 font-semibold hover:bg-transparent flex items-center"
                        >
                            Email
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ getValue }) => (
                    <div className="text-gray-600">{getValue()}</div>
                ),
            }),
            columnHelper.display({
                id: 'status',
                header: () => <span className="font-semibold text-gray-900">Status</span>,
                cell: ({ row }) => getStatusBadge(row.original),
                size: 120,
            }),
            columnHelper.accessor('createdAt', {
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className="h-auto p-0 font-semibold hover:bg-transparent flex items-center"
                        >
                            Last Active
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ getValue }) => (
                    <div className="text-gray-600">{formatDate(getValue() ?? '')}</div>
                ),
                size: 150,
            }),
            columnHelper.display({
                id: 'actions',
                header: () => <span className="font-semibold text-gray-900">Actions</span>,
                cell: ({ row }) => {
                    const user = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-8 w-8 p-0"
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    handleUserClick(user);
                                }}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
                size: 80,
            }),
        ],
        []
    );

    const table = useReactTable({
        data: users || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="ml-3 text-lg text-gray-600">Loading users...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error: {error}</div>
        </div>
    );

    return (
        <div className="space-y-6 p-6">
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
                                    Manage and monitor user activities ({table.getFilteredRowModel().rows.length} users)
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
                    {/* Search and Filter Bar */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search all columns..."
                                    value={globalFilter ?? ''}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        {/* Pagination Info */}
                        <div className="text-sm text-gray-500">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border bg-white overflow-hidden">
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="bg-gray-50/50 border-b">
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-4 text-left"
                                                style={{ width: header.getSize() }}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                            onClick={() => handleUserClick(row.original)}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length} className="px-6 py-8 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="w-8 h-8 text-gray-400" />
                                                <p className="text-gray-500">No users found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-2 py-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<<"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {">"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                {">>"}
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Rows per page:</span>
                            <select
                                className="h-8 w-16 rounded border border-gray-300 px-2 text-sm"
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* User Details Dialog */}
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
                                    <div className="text-sm text-gray-600">{formatDate(selectedUser?.createdAt || '')}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                <div>
                                    <div className="text-sm font-medium">User ID</div>
                                    <div className="text-sm text-gray-600 font-mono">{selectedUser?.id}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    {selectedUser && getStatusBadge(selectedUser)}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="w-4 h-4 mr-2" />
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