import React from "react";

const Orders = () => {
  return (
    <section className="all_orders_section">
      <div className="container">
        <div className="all_orders_wrapper wrapper ver">
          <div className="all_hotels-top">
            <div className="all_hotels-num">
              Всего заказов: <span>{orders.length}</span>
            </div>
            <button className="all_hotels-sort-btn">Сортировать</button>
          </div>
          {orders?.map((order, index) => {
            return (
              <OrderRow
                key={index}
                index={index}
                name={order.name}
                location={order.location}
                price={order.price}
                amount={order.amount}
                startDate={order.startDate}
                endDate={order.endDate}
                sum={order.sum}
                room={order.room}
                days={order.days}
                // status={order.status}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Orders;
