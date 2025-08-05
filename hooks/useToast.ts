'use client';

import { useState, useCallback } from 'react';
import { Toast, ToastType } from '@/app/components/ui/Toast';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info', options?: Partial<Toast>) => {
    return addToast({
      title: message,
      type,
      ...options,
    });
  }, [addToast]);

  const success = useCallback((message: string, options?: Partial<Toast>) => {
    return toast(message, 'success', options);
  }, [toast]);

  const error = useCallback((message: string, options?: Partial<Toast>) => {
    return toast(message, 'error', options);
  }, [toast]);

  const warning = useCallback((message: string, options?: Partial<Toast>) => {
    return toast(message, 'warning', options);
  }, [toast]);

  const info = useCallback((message: string, options?: Partial<Toast>) => {
    return toast(message, 'info', options);
  }, [toast]);

  return {
    toasts,
    addToast,
    removeToast,
    toast,
    success,
    error,
    warning,
    info,
  };
}