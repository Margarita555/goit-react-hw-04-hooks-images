import { useState } from 'react';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li key={id} className={s.galleryItem}>
      <img
        onClick={toggleModal}
        className={s.galleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      )}
    </li>
  );
}
