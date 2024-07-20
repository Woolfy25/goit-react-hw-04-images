import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = (props, src, alt) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      props.onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
export default Modal;
