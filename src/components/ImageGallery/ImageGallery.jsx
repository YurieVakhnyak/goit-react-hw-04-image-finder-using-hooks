import React, { Component } from 'react';
// import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { ImagesErrorView } from '../ImagesErrorView/ImagesErrorView';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import css from '../ImageGallery/ImageGallery.module.css';
import { Notify } from 'notiflix';

const API_KEY = '33411326-e3b74484d09501fb125cb8795';

let perPage = 12;

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    pageNumber: 1,
    target: null,
  };

  loadMoreImages = evt => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));

    console.log(this.state.pageNumber);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending', pageNumber: 1 });

      let inputQuery = this.props.searchValue.trim();
      const { pageNumber } = this.state.pageNumber;

      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: inputQuery,
        per_page: 200,
        page: pageNumber,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      });

      this.setState({ images: null });

      setTimeout(() => {
        fetch(`https://pixabay.com/api/?${searchParams}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error('Щось не так...'));
          })
          .then(images => {
            return this.setState({ images, status: 'resolved' });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1500);
    }
  }

  render() {
    const { images, error, status, pageNumber } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.firstSpinner}>
          Тут будуть картинки за Вашим запитом...
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.firstSpinner}>
          <InfinitySpin width="200" color="blue" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <ImagesErrorView message={error.message} />;
    }
    if (status === 'resolved' && this.state.images.totalHits === 0) {
      return Notify.failure('На жаль, нічого не знайдено...');
    }
    if (status === 'resolved') {
      const startIndex = 0;
      const endIndex = pageNumber * perPage;

      const currentImages = images.hits.slice(startIndex, endIndex);
      return (
        <div className={css.GalleryThumb}>
          <ul className={css.ImageGallery}>
            {currentImages.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                showLargeImage={this.state.showLargeImage}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClickImage={this.toggleModal}
              />
            ))}
          </ul>
          {currentImages.length < images.totalHits && (
            <LoadMoreButton loadMoreImages={this.loadMoreImages} />
          )}
        </div>
      );
    }
  }
}
