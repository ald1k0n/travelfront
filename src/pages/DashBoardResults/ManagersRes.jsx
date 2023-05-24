import React, { useEffect, useState } from "react";

import {
  useGetManagersQuery,
  useLazyGetManagersQuery,
} from "../../features/services/user.service";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Manager from "../Manager/Manager";

const ManagersRes = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [managers, setManagers] = useState([]);
  const [fetchManagers, { isFetching }] = useLazyGetManagersQuery();
  // const { data: managers, isLoading, isFetching } = useGetManagersQuery();

  const [data, setData] = useState("");

  const handleSearch = () => {
    fetchManagers(data).then(({ data }) => setManagers(data));
  };

  useEffect(() => {
    fetchManagers(data).then(({ data }) => setManagers(data));
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user.role !== "Admin") {
      navigate("/dashboard/requests");
    }
  }, []);

  return (
    <div className="reqs_tab tab">
      <Manager
        handleSearch={handleSearch}
        setData={setData}
        isLoading={isFetching}
        users={managers}
      />
    </div>
  );
};

export default ManagersRes;
