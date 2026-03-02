import { useState, useCallback } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  notifySuccess: (title: string, message: string) => void;
  notifyError: (title: string, message: string) => void;
  notifyInfo: (title: string, message: string) => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = crypto.randomUUID();
    const duration = notification.duration || 5000;

    setNotifications((prev) => [...prev, { ...notification, id }]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, [removeNotification]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const notifySuccess = useCallback((title: string, message: string) => {
    addNotification({ type: 'success', title, message });
  }, [addNotification]);

  const notifyError = useCallback((title: string, message: string) => {
    addNotification({ type: 'error', title, message, duration: 8000 });
  }, [addNotification]);

  const notifyInfo = useCallback((title: string, message: string) => {
    addNotification({ type: 'info', title, message });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    notifySuccess,
    notifyError,
    notifyInfo,
  };
}