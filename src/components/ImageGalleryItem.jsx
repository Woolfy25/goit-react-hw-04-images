import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, largeSrc, onClick }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick(largeSrc, alt)}>
      <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
