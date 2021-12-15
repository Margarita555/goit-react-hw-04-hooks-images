import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import APIfetchImages from '../../services/imagesApi';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import LoadingElement from '../LoadingElement/LoadingElement';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [height, setHeight] = useState(null);
  console.log(height);
  const setScrollHeight = useCallback(() => {
    const searchbarAndButtonHeight = 150;
    const scrollHeight =
      document.body.scrollHeight -
      (document.body.scrollHeight -
        (document.documentElement.clientHeight +
          document.documentElement.scrollTop -
          searchbarAndButtonHeight));
    setHeight(scrollHeight);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    if (page === 1) {
    }
    APIfetchImages({ searchQuery, page })
      .then(resultImages => {
        setImages(prevImages => [...prevImages, ...resultImages.hits]);
        if (page > 1) {
          setScrollHeight();
        }
      })
      .catch(error => setError({ error }))
      .finally(() => setLoading(false));
  }, [searchQuery, page, setScrollHeight]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: height,
      behavior: 'smooth',
    });
  }, [height]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const onMoreBtnClick = () => {
    setPage(state => state + 1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <LoadingElement />}
      {error && <h1 className={s.errorMessage}>{error.message}</h1>}
      <ImageGallery images={images} />
      {images.length > 0 && <Button onMoreBtnClick={onMoreBtnClick} />}
    </div>
  );
}
