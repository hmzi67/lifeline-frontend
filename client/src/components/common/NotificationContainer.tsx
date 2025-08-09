import React from 'react';
import { useUIStore } from '../../stores';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

// Define or import the correct type for your UI store
type Notification = {
    id: string;
    type: string;
    title: string;
    message: string;
};
type UIStoreType = {
    notifications: Notification[];
    removeNotification: (id: string) => void;
};

export const NotificationContainer: React.FC = () => {
    const { notifications, removeNotification } = useUIStore() as UIStoreType;

    if (notifications.length === 0) {
        return null;
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'info':
                return <Info className="h-5 w-5 text-blue-500" />;
            default:
                return <Info className="h-5 w-5 text-gray-500" />;
        }
    };

    const getBorderColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'border-green-200';
            case 'error':
                return 'border-red-200';
            case 'warning':
                return 'border-yellow-200';
            case 'info':
                return 'border-blue-200';
            default:
                return 'border-gray-200';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`bg-white border-l-4 ${getBorderColor(
                        notification.type
                    )} rounded-lg shadow-lg p-4 animate-in slide-in-from-right-full duration-300`}
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {getIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                            <h4 className="text-sm font-semibold text-gray-900">
                                {notification.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                                {notification.message}
                            </p>
                        </div>
                        <div className="ml-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNotification(notification.id)}
                                className="h-6 w-6 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
