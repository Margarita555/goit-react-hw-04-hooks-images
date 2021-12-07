import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseButton } from '../../images/closeBtn.svg';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, largeImageURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = e => {
    if (
      e.currentTarget === e.target ||
      e.target.nodeName === 'svg' ||
      e.target.nodeName === 'path'
    ) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <CloseButton className={s.closeButton} fill="#fff" />
      <div className={s.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}

