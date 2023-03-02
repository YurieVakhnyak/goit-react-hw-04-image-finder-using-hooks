import css from '../Searchbar/Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { Notify } from 'notiflix';

export default function Searchbar({ submitSearchValue }) {
  const [searchValue, setSearchValue] = useState();

  const onSubmitSearch = evt => {
    evt.preventDefault();
    if (searchValue.trim === '') {
      Notify.info('Enter something...');
      return;
    }

    submitSearchValue(searchValue);

    setSearchValue({
      searchValue: '',
    });
  };

  const onChangeSearchValue = evt => {
    const { value } = evt.target;

    setSearchValue(value);
    console.log(searchValue);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={onSubmitSearch} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <FaSearch size={35} />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          name="searchValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeSearchValue}
        />
      </form>
    </header>
  );
}
