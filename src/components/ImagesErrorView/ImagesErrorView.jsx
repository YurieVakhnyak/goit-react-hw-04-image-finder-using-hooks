import ErrorImage from './error-cat.jpg';
import css from '../ImagesErrorView/ImagesErrorView.module.css';

export const ImagesErrorView = ({ message }) => {
  return (
    <div className={css.error} role="alert">
      <img src={ErrorImage} alt="sadcat" width={400} />
      <p className={css.messageError}>{message}</p>
    </div>
  );
};
