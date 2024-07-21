import React, { useEffect, useState, useCallback } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { Circles } from 'react-loader-spinner';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');
  const [query, setQuery] = useState('cat');
  const [loading, setLoading] = useState(false);

  const API_KEY = '44948375-490a2b5531ef23b5637f1620a';
  const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const fetchImages = useCallback(async () => {
    setLoading(true);

    const URL = `${BASE_URL}&q=${query}&page=${page}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      setImages(prevImages => [
        ...prevImages,
        ...data.hits
          .map(hit => ({
            id: hit.id,
            src: hit.webformatURL,
            alt: hit.tags,
            largeSrc: hit.largeImageURL,
          }))
          .filter(
            newImage => !prevImages.some(image => image.id === newImage.id)
          ),
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  }, [query, page, BASE_URL]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleValue = search => {
    setQuery(search);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (src, alt) => {
    setShowModal(true);
    setModalImageSrc(src);
    setModalImageAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageSrc('');
    setModalImageAlt('');
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleValue} />
      {loading && (
        <div className={css.Loader}>
          <Circles
            height="80"
            width="80"
            color="#7703fc"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <ImageGallery items={images} onImageClick={openModal} />
      {images.length > 0 && <Button onClick={loadMoreImages} />}
      {showModal && (
        <Modal src={modalImageSrc} alt={modalImageAlt} onClose={closeModal} />
      )}
    </div>
  );
};
