'use client';

import { useState, useCallback } from 'react';

export function useModal() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onClose: null,
  });

  const showModal = useCallback((title, message, type = 'info') => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title,
        message,
        type,
        onClose: () => {
          setModalState(prev => ({ ...prev, isOpen: false }));
          resolve();
        },
      });
    });
  }, []);

  const hideModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    modalState,
    showModal,
    hideModal,
  };
}