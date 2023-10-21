/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useState } from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '../Button';

import styles from './modal.module.scss';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div
        aria-modal="true"
        role="dialog"
        // eslint-disable-next-line prettier/prettier
        className={`${styles.modal__content} ${showModal ? styles.show : styles.hide}`}>
        <div className={styles.modal__container}>
          {/* HEADER */}
          <div className={styles.modal__header}>
            <div className={styles.modal__title}>{title}</div>
            <button type="button" onClick={handleClose}>
              <CloseRoundedIcon sx={{ fontSize: 30 }} />
            </button>
          </div>
          {/* BODY */}
          <div className={styles.modal__body}>{body}</div>
          {/* FOOTER */}
          <div className={styles.modal__footer}>
            <div className={styles.button__container}>
              <Button disabled={disabled} onClick={handleSubmit}>
                {actionLabel}
              </Button>
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
