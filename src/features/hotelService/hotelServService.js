import axios from "axios";
import { API_URL_PROXY } from "../../config/config";

const API_URL = `${API_URL_PROXY}/hotelServices/`;

// Add new hotel service

const addService = async (serviceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, serviceData, config);
  return response.data;
};

const hotelServService = {
  addService,
};

export default hotelServService;
