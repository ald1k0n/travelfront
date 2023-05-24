import axios from "axios";
import { API_URL_PROXY } from "../../config/config";

const API_URL = `${API_URL_PROXY}/excursions/`;

// Get searched hotels

const getExcursions = async (locationId) => {
  const response = await axios.get(API_URL + locationId);
  return response.data;
};

const excursionService = {
  getExcursions,
};

export default excursionService;
