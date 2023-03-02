import React, { useState } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  const [searchValue, setSearchValue] = useState();

  return (
    <div className={css.App}>
      <Searchbar submitSearchValue={setSearchValue} />
      <ImageGallery searchValue={searchValue} />
    </div>
  );
}
