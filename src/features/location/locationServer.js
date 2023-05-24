import axios from "axios";
import { API_URL_PROXY } from "../../config/config";

const API_URL = `${API_URL_PROXY}/locations/`;

// Get location
const getLocations = async (locationId) => {
  const response = await axios.get(API_URL + locationId);
  return response.data;
};

const locationService = {
  getLocations,
};

export default locationService;
