import axios from 'axios';

const useAxios = () => {
  //GET request
  const get = (url) => axios.get(url);

  //POST request
  const post = (url, data) => axios.post(url, data);

  //PUT request
  const put = (url, data) => axios.put(url, data);

  //PATCH request
  const patch = (url, data) => axios.patch(url, data);

  //DELETE request
  const del = (url) => axios.delete(url);

  return { get, post, put, patch, del };
};

export default useAxios;
