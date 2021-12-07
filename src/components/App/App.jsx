import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import LoadingElement from '../LoadingElement/LoadingElement';
import s from './App.module.css';

const APIfetchImages = ({ searchQuery = '', page = 1, pageSize = 12 }) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
  );
};

export default function App() {
  const myRef = React.createRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    APIfetchImages({ searchQuery, page })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('No images found'));
      })
      .then(resultImages => {
        setImages(prevImages => [...prevImages, ...resultImages.hits]);
      })
      .catch(error => setError({ error }))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    myRef.current.scrollIntoView();
  };

  const onMoreBtnClick = () => {
    setPage(state => state + 1);
    console.log(page);
  };

  return (
    <div className={s.app} ref={myRef}>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <LoadingElement />}
      {error && <h1 className={s.errorMessage}>{error.message}</h1>}
      <ImageGallery images={images} />
      {images.length > 0 && <Button onMoreBtnClick={onMoreBtnClick} />}
    </div>
  );
}
