const axios = require('axios').default;

const getImages = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '23351611-7864196d6829752dad19e3759',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export default async function ApiFetchImages(q = '', page = 1, per_page = 12) {
  const params = { q, page, per_page };
  try {
    const { data } = await getImages('', { params });
    console.log(data);
    return data;
  } catch (error) {
    return error(`No results found for ${q}`);
  }
}
