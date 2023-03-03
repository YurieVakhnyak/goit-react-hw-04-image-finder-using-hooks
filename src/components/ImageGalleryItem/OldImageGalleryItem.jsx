import React, { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { ImSpinner9 } from 'react-icons/im';

export class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      showModal: false,
      loading: true,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === 27) {
      // обробка натискання клавіші Escape

      console.log('Escape key pressed');
      this.setState(() => ({
        showModal: false,
      }));
    }
  }

  handleImageLoad = () => {
    this.setState({ loading: false });
  };

  toggleModal = evt => {
    evt.preventDefault();

    this.setState(({ showModal }) => ({
      showModal: !showModal,
      // target: evt.target,
    }));
  };

  render() {
    const { showModal, loading } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;

    if (showModal) {
      return (
        <Modal className={css.ImageGalleryItem} onClick={this.toggleModal}>
          {loading && (
            <ImSpinner9 size="100" className={css.iconSpin} color="blue" />
          )}
          <img
            onClick={this.toggleModal}
            onLoad={this.handleImageLoad}
            src={largeImageURL}
            alt={tags}
            loading="lazy"
          />
        </Modal>
      );
    }

    return (
      <div className={css.ImageGalleryItem} onClick={this.toggleModal}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        />
      </div>
    );
  }
}
