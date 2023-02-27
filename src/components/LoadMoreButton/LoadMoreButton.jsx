import css from '../LoadMoreButton/LoadMoreButton.module.css';

export const LoadMoreButton = ({ loadMoreImages }) => {
  return (
    <button type="button" className={css.Button} onClick={loadMoreImages}>
      Load More
    </button>
  );
};
