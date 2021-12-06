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
// export default class App extends Component {
//   myRef = React.createRef();
//   state = {
//     searchQuery: "",
//     images: [],
//     page: 1,
//     loading: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ loading: true });
//       fetch(
//         `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           }
//           return Promise.reject(new Error("No images found"));
//         })
//         .then((resultImages) => {
//           if (prevState.searchQuery !== this.state.searchQuery) {
//             this.setState({ images: resultImages.hits });
//             this.myRef.current.scrollIntoView();
//           } else {
//             this.setState((prevState) => ({
//               images: [...prevState.images, ...resultImages.hits],
//             }));
//           }
//         })
//         .catch((error) => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleFormSubmit = (query) => {
//     this.setState({ searchQuery: query });
//   };

//   onMoreBtnClick = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     return (
//       <div className={s.app} ref={this.myRef}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {this.state.loading && <LoadingElement />}
//         {this.state.error && (
//           <h1 className={s.errorMessage}>{this.state.error.message}</h1>
//         )}
//         <ImageGallery images={this.state.images} />
//         {this.state.images.length > 0 && (
//           <Button onMoreBtnClick={this.onMoreBtnClick} />
//         )}
//       </div>
//     );
//   }
// }
