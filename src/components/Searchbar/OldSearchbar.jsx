import css from '../Searchbar/Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import React, { Component } from 'react';
import { Notify } from 'notiflix';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  onSubmitSearch = evt => {
    evt.preventDefault();
    if (this.state.searchValue.trim() === '') {
      Notify.info('Enter something to start');
      return;
    }
    this.props.submitSearchValue(this.state);
    this.setState({
      searchValue: '',
    });
  };

  onChangeSearchValue = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  // ({ value, onInputSearch, onSubmitSearch
  //  }) => {
  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.onSubmitSearch} className={css.SearchForm}>
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
            onChange={this.onChangeSearchValue}
          />
        </form>
      </header>
    );
  }
}
