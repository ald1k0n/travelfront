import axios from "axios";
import { API_URL_PROXY } from "../../config/config";

const API_URL = `${API_URL_PROXY}/hotels/`;

//  Add new hotel

const addHotel = async (hotelData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, hotelData, config);
  return response.data;
};

// Update hotel periods

const updateHotelPeriods = async (periodsData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + periodsData.hotelId + "/periods",
    periodsData,
    config
  );
  return response.data;
};

// Delete period

const deletePeriod = async (periodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + periodData.hotelId + "/delete-period",
    periodData,
    config
  );
  return response.data;
};

//  Update hotel

const updateHotel = async (hotelData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + hotelData._id,
    hotelData,
    config
  );
  return response.data;
};

// Get all hotels

const getHotels = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get searched hotels

const getSearchedHotels = async (
  locationId,
  peopleAmount,
  daysAmount,
  start,
  adultsAmount,
  kidsAmount
) => {
  const params = {
    locationId,
    peopleAmount,
    daysAmount,
    start,
    adultsAmount,
    kidsAmount,
  };
  const response = await axios.get(API_URL + "searched/", { params });
  return response.data;
};

// Get single hotel

const getSingleHotel = async (hotelId) => {
  const response = await axios.get(API_URL + hotelId);
  return response.data;
};

// Get admin hotels

const getAdminHotels = async (name, minAge, locationId) => {
  const params = {
    name,
    minAge,
    locationId,
  };
  const response = await axios.get(API_URL + "admin/", { params });
  return response.data;
};

const hotelService = {
  addHotel,
  updateHotel,
  getHotels,
  getSearchedHotels,
  getSingleHotel,
  getAdminHotels,
  updateHotelPeriods,
  deletePeriod,
};

export default hotelService;
