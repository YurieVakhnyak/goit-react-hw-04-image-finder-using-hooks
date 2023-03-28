import { useState, useEffect } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { ImSpinner9 } from 'react-icons/im';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = event => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const toggleModal = evt => {
    evt.preventDefault();
    setShowModal(!showModal);
  };

  if (showModal) {
    return (
      <Modal className={css.ImageGalleryItem} onClick={toggleModal}>
        {loading && (
          <ImSpinner9 size="100" className={css.iconSpin} color="blue" />
        )}
        <img
          onClick={toggleModal}
          onLoad={handleImageLoad}
          src={largeImageURL}
          alt={tags}
          loading="lazy"
        />
      </Modal>
    );
  }

  return (
    <div className={css.ImageGalleryItem} onClick={toggleModal}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </div>
  );
}
