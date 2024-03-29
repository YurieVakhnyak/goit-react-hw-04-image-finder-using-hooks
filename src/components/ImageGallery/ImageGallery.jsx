import { useState, useEffect } from 'react';
// import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { ImagesErrorView } from '../ImagesErrorView/ImagesErrorView';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import css from '../ImageGallery/ImageGallery.module.css';
import { Notify } from 'notiflix';

const API_KEY = '33411326-e3b74484d09501fb125cb8795';
let perPage = 12;

export default function ImageGallery({ searchValue }) {
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const loadMoreImages = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setStatus('pending');
    setPageNumber(1);

    let inputQuery = searchValue.trim();
    console.log(`inputQuery: ${searchValue}`);
    // setPageNumber(pageNumber);

    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: inputQuery,
      per_page: 200,
      page: pageNumber,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    setImages(null);

    fetch(`https://pixabay.com/api/?${searchParams}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Щось не так...'));
      })
      .then(images => {
        setStatus('resolved');
        setImages(images);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line
  }, [searchValue]);

  if (status === 'idle') {
    return (
      <div className={css.firstSpinner}>
        Here will be pictures at your request...
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
  if (status === 'resolved' && images.totalHits === 0) {
    return Notify.failure('Unfortunately, nothing was found...');
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
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        {currentImages.length < images.totalHits && (
          <LoadMoreButton loadMoreImages={loadMoreImages} />
        )}
      </div>
    );
  }
}
