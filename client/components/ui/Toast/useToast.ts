import { useState, useCallback } from 'react';

interface ToastState {
  open: boolean;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: '',
  });

  const showToast = useCallback(
    (newToast: Omit<ToastState, 'open'>) => {
      setToast({ ...newToast, open: true });
    },
    []
  );

  const dismissToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    toast,
    showToast,
    dismissToast,
  };
}