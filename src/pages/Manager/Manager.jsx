import { useState, useEffect } from "react";

import RequestTable from "../Requests/RequestTable";
import HotelSearch from "../../components/SearchPanel/HotelSearch";

import Loader from "../../components/Loader";
import { useDeleteManagersMutation } from "../../features/services/user.service";

const Manager = ({ users, isLoading, setData, handleSearch }) => {
  const [managerIds, setManagerIds] = useState([]);

  const columns = [
    {
      id: "checkbox",
      header: "checkbox",
      Cell: ({ row }) => (
        <input
          type="checkbox"
          value={row.original._id}
          checked={managerIds.includes(row.original._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setManagerIds([...managerIds, e.target.value]);
            } else {
              setManagerIds(managerIds.filter((id) => id !== e.target.value));
            }
          }}
        />
      ),
    },
    {
      id: "_id",
      header: "ID",
      accessor: "_id",
    },
    {
      id: "name",
      header: "Имя",
      accessor: "name",
    },
    {
      id: "phone",
      header: "Номер Телефона",
      accessor: "phone",
    },
    {
      id: "email",
      header: "Email",
      accessor: "email",
    },
    {
      id: "delete",
      header: "Удалить",
      Cell: () => <button onClick={handleDeleteManager}>...</button>,
    },
  ];

  const [deleteManagers] = useDeleteManagersMutation();

  const handleDeleteManager = async () => {
    await deleteManagers({ managerIds });
  };

  return (
    <>
      <HotelSearch find={handleSearch} handleQuery={setData} reqMode />

      <section
        className="dash_section"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <RequestTable columns={columns} data={users} isManager />
        )}
      </section>
    </>
  );
};

export default Manager;
