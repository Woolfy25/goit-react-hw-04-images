import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { Circles } from 'react-loader-spinner';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      page: 1,
      showModal: false,
      modalImageSrc: '',
      modalImageAlt: '',
      query: 'cat',
      loading: false,
    };
  }
  handleValue = search => {
    this.setState({ query: search, page: 1, images: [] }, this.fetchImages);
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    this.setState({ loading: true });
    const { query, page } = this.state;
    const API_KEY = '44948375-490a2b5531ef23b5637f1620a';
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      this.setState(prevState => ({
        images: [
          ...prevState.images,
          ...data.hits
            .map(hit => ({
              id: hit.id,
              src: hit.webformatURL,
              alt: hit.tags,
              largeSrc: hit.largeImageURL,
            }))
            .filter(
              newImage =>
                !prevState.images.some(image => image.id === newImage.id)
            ),
        ],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  openModal = (src, alt) => {
    this.setState({
      showModal: true,
      modalImageSrc: src,
      modalImageAlt: alt,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalImageSrc: '',
      modalImageAlt: '',
    });
  };

  render() {
    const { images, showModal, modalImageSrc, modalImageAlt, loading } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleValue} />
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
        <ImageGallery items={images} onImageClick={this.openModal} />
        {images.length > 0 && <Button onClick={this.loadMoreImages} />}
        {showModal && (
          <Modal
            src={modalImageSrc}
            alt={modalImageAlt}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
