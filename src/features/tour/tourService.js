import axios from "axios";
import { API_URL_PROXY } from "../../config/config";

const API_URL = `${API_URL_PROXY}/tour/`;

// Get all tours

const getTours = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const tourService = {
  getTours,
};

export default tourService;
