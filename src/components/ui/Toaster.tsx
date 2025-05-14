import { useState, useEffect, ReactNode } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const toasts: Toast[] = [];
let toastCounter = 0;

// Toast event bus
const listeners: ((toasts: Toast[]) => void)[] = [];

export const toast = {
  success: (message: string) => {
    addToast({ message, type: 'success' });
  },
  error: (message: string) => {
    addToast({ message, type: 'error' });
  },
  info: (message: string) => {
    addToast({ message, type: 'info' });
  }
};

const addToast = ({ message, type }: { message: string; type: 'success' | 'error' | 'info' }) => {
  const id = `toast-${toastCounter++}`;
  toasts.push({ id, message, type });
  
  // Notify listeners
  listeners.forEach(listener => listener([...toasts]));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  }, 5000);
};

const ToastItem = ({ toast }: { toast: Toast }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[toast.type];
  
  return (
    <div 
      className={`${bgColor} text-white px-4 py-3 rounded shadow-lg mb-3 transform transition-all duration-300 ease-in-out animate-fade-in`}
    >
      <div className="flex justify-between items-center">
        <p>{toast.message}</p>
        <button
          onClick={() => {
            const index = toasts.findIndex(t => t.id === toast.id);
            if (index !== -1) {
              toasts.splice(index, 1);
              listeners.forEach(listener => listener([...toasts]));
            }
          }}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const Toaster = () => {
  const [toastList, setToastList] = useState<Toast[]>([]);
  
  useEffect(() => {
    const handleToastChange = (newToasts: Toast[]) => {
      setToastList([...newToasts]);
    };
    
    listeners.push(handleToastChange);
    return () => {
      const index = listeners.indexOf(handleToastChange);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  
  if (toastList.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full">
      {toastList.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};