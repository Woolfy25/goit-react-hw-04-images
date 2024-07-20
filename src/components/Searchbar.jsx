import React, { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = props => {
  const [search, setSearch] = useState('');

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onSubmit(search);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleSearch}
        />
      </form>
    </header>
  );
};

export default Searchbar;
