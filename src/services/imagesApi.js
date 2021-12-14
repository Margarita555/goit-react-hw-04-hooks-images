const BASE_URL = 'https://pixabay.com';
const API_KEY = '23351611-7864196d6829752dad19e3759';

export default async function APIfetchImages({
  searchQuery = '',
  page = 1,
  pageSize = 12,
}) {
  const response = await fetch(
    `${BASE_URL}/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
  );
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

// const APIfetchImages = ({ searchQuery = '', page = 1, pageSize = 12 }) => {
//   return fetch(
//     `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
//   );
// };
