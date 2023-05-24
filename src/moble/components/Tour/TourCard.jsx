import React from "react";
import { useGetTourQuery } from "../../../features/services/base.service";
import Loader from "../Loader/Loader";
import Card from "../Layout/Card";
import Hot from "../Hot/Hot";

const Tour = () => {
  const { data, isLoading, isSuccess } = useGetTourQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess)
    return (
      <>
        <Hot count={data.length} />
        {data.map((tour) => (
          <Card
            rating={tour.rating}
            stars={tour.rating}
            name={tour.name}
            locationFeature={`${tour.locationFeature}, ${
              tour.locationId && tour.locationId.locationName
                ? tour.locationId.locationName
                : ""
            }`}
          />
        ))}
      </>
    );
};

export default Tour;
