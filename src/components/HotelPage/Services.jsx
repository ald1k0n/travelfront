import React, { useState, useEffect } from "react";

import serv from "../../assets/serv.svg";

const Services = ({ hotelServices, title }) => {
  const [servicesToRender, setServicesToRender] = useState();

  useEffect(() => {
    const result = hotelServices?.reduce((acc, cur) => {
      const category = cur.category.categoryName;
      const service = {
        _id: cur._id,
        hotelServiceName: cur.hotelServiceName,
      };

      if (!acc[category]) {
        acc[category] = {
          category,
          services: [service],
        };
      } else {
        acc[category].services.push(service);
      }

      return acc;
    }, {});

    const arrayResult = result ? Object.values(result) : [];

    if (hotelServices) setServicesToRender(arrayResult);
  }, [hotelServices]);

  return (
    <div className="hotel_services-row">
      <div className="body_title-box">
        <div className="body_title">{title}</div>
      </div>
      <div className="services_box">
        {servicesToRender
          ? servicesToRender.map((obj) => {
              return (
                <div className="services_col" key={obj._id}>
                  <div className="services_col-title">
                    <img src={serv} alt="" />
                    {obj.category}
                  </div>
                  <ul className="services_list">
                    {obj?.services?.map((serv) => {
                      return <li key={serv._id}>{serv.hotelServiceName}</li>;
                    })}
                  </ul>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Services;
