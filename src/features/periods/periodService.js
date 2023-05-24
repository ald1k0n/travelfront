import axios from "axios";
import { API_URL_PROXY } from "../../config/config";

const API_URL = `${API_URL_PROXY}/periods/`;

// Add new hotel periods

const addPeriods = async (periods, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, periods, config);
  return response.data;
};

// Add new sanatorium periods

const addSanatoriumPeriods = async (periods, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "sanatorium", periods, config);
  return response.data;
};

// Add new camp periods

const addCampPeriods = async (periods, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "camp", periods, config);
  return response.data;
};

// Add new tour periods

const addTourPeriods = async (periods, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "tour", periods, config);
  return response.data;
};

// Delete period

const deletePeriod = async (periodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(API_URL + periodId, config);
};

// Delete camp period

const deleteCampPeriod = async (periodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(API_URL + periodId + "/camp", config);
};

// Delete tour period

const deleteTourPeriod = async (periodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(API_URL + periodId + "/tour", config);
};

const periodService = {
  addPeriods,
  deletePeriod,
  addSanatoriumPeriods,
  addCampPeriods,
  addTourPeriods,
  deleteCampPeriod,
  deleteTourPeriod,
};

export default periodService;
