import React, { useMemo } from "react";

import HotelSearch from "../../components/SearchPanel/HotelSearch";
import RequestTable from "./RequestTable";
import { useSelector } from "react-redux";
import {
  useLazyGetOrdersByQueryQuery,
  useUpdateStatusMutation,
  useLazyGetOrderByIdQuery,
} from "../../features/services/base.service";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

const Requests = () => {
  const { user } = useSelector((state) => state.auth);

  // const { data: orders = [], isLoading } = useGetOrdersQuery(user.token);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [getOrder] = useLazyGetOrderByIdQuery();
  const [order, setOrder] = React.useState(null);
  // const {
  //   data: orders = [],
  //   isLoading,
  // } = useGetOrdersByQueryQuery({
  //   token: user.token,
  //   query: query,
  //   status: status,
  // });
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [fetchOrders, { isFetching }] = useLazyGetOrdersByQueryQuery();

  const [updateStatus] = useUpdateStatusMutation();

  React.useEffect(() => {
    fetchOrders({
      token: user?.token,
      query: query,
      status: status,
    })
      .then(({ data }) => setOrders(data))
      .then(() => setIsLoading(false));
  }, [orders]);

  // console.log(orders);

  const statuses = [
    {
      label: "В обработке",
      style: "req-status",
    },
    {
      label: "Отклонено",
      style: "den-status",
    },
    {
      label: "Оплачено",
      style: "paid-status",
    },
    {
      label: "На паузе",
      style: "pause-status",
    },
  ];

  const handleUpdate = (id, status) => {
    const values = {
      id,
      status,
    };
    updateStatus(values).then(({ data }) => {
      const orderIndex = orders.findIndex((order) => order._id === data._id);
      const newOrders = [
        ...orders.slice(0, orderIndex),
        { ...orders[orderIndex], status: data.status },
        ...orders.slice(orderIndex + 1),
      ];
      setOrders(newOrders);
    });
  };

  const columns = useMemo(
    () => [
      {
        id: "checkbox",
        header: "Checkbox",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            value={row.original._id}
            onChange={(e) => console.log(e.target.value)}
          />
        ),
      },
      {
        id: "uid",
        header: "Order ID",
        accessor: "uid",
      },
      {
        id: "name",
        header: "Имя",
        accessor: "clientName",
      },
      {
        id: "phone",
        header: "Номер телефона",
        accessor: "clientPhone",
      },
      {
        id: "email",
        header: "Электронная почта",
        accessor: "clientEmail",
      },
      {
        id: "dateOfRequest",
        header: "Дата заявки",
        Cell: ({ row }) => {
          const date = new Date(+row.original.startDate);
          return date.toLocaleString(undefined, {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          });
        },
      },
      {
        id: "category",
        header: "Категория",
      },
      {
        id: "details",
        header: "Подробности",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              getOrder(row.original._id).then(({ data }) => {
                setOrder(data);
              });
              setIsOpen(true);
            }}
            className="order-btn"
          >
            Открыть заказ
          </button>
        ),
      },
      {
        id: "status",
        header: "Статус",
        accessor: "status",
        Cell: ({ row }) => (
          <button
            className={`${
              statuses.filter((stat) =>
                stat.label.includes(row.original.status)
              )[0]?.style
            } status-btn`}
          >
            {/* {row.original.status} */}
            <select
              className="status-select"
              onChange={(e) => handleUpdate(row.original._id, e.target.value)}
            >
              {statuses.map((stat) => (
                <option
                  key={stat.label}
                  value={stat.label}
                  className={stat.style}
                  selected={stat.label === row.original.status}
                >
                  {stat.label}
                </option>
              ))}
            </select>
          </button>
        ),
      },
      // {
      //   id: "changeStatus",
      //   header: "Изменить статус",
      //   Cell: ({ row }) => (
      //     <>
      //       <select
      //         className="status-select"
      //         onChange={(e) => handleUpdate(row.original._id, e.target.value)}
      //       >
      //         {statuses.map((stat) => (
      //           <option
      //             key={stat.label}
      //             value={stat.label}
      //             className={stat.style}
      //             selected={stat.label === row.original.status}
      //           >
      //             {stat.label}
      //           </option>
      //         ))}
      //       </select>
      //     </>
      //   ),
      // },
    ],
    []
  );

  const handleSearch = () => {
    fetchOrders({
      token: user && user?.token,
      query: query,
      status: status,
    })
      .then(({ data }) => {
        setIsLoading(true);
        setOrders(data);
      })
      .finally(() => setIsLoading(false));
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <HotelSearch
        mode="request"
        reqMode
        handleQuery={setQuery}
        handleStatus={setStatus}
        find={handleSearch}
        query={query}
      />

      <section className="dash_section">
        {isFetching ? (
          <Loader />
        ) : (
          <RequestTable columns={columns} data={orders} />
        )}
      </section>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div style={{ lineHeight: "1.5" }}>
          <h2>Заказ №{order?.uid}</h2>
          <div className="order-details">
            <div className="order-details__item">
              <h3>Имя</h3>
              <p>{order?.clientName}</p>
            </div>
            <div className="order-details__item">
              <h3>Номер телефона</h3>
              <p>{order?.clientPhone}</p>
            </div>
            <div className="order-details__item">
              <h3>Электронная почта</h3>
              <p>{order?.clientEmail}</p>
            </div>
            <div className="order-details__item">
              <h3>Дата заявки</h3>
              <p>
                {new Date(+order?.startDate).toLocaleString(undefined, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="order-details__item">
              <h3>Количество людей</h3>
              <p>{order?.peopleAmount}</p>
            </div>
            <div className="order-details__item">
              <h3>Дополнительная информация</h3>
              <p>{order?.extraInfo}</p>
            </div>
            <div className="order-details__item">
              <h3>Цена без маржи</h3>
              <p>{Number(order?.sum) / 1.1}</p>
            </div>
            <div className="order-details__item">
              <h3>Цена с маржой</h3>
              <p>{Number(order?.sum)}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Requests;
