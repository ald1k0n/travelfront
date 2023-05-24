import React from "react";

const TopTags = ({ services }) => {
  return (
    <>
      {services
        ? services
            ?.filter((serv) => serv.priority === 1)
            .map((serv) => {
              return (
                <div className="hotel_tag" key={serv._id}>
                  {serv.icon ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: serv.icon,
                      }}
                    />
                  ) : null}
                  {serv.hotelServiceName}
                </div>
              );
            })
        : null}
    </>
  );
};

export default TopTags;
