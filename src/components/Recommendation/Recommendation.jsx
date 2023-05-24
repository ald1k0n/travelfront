import React from "react";
import Section from "../Section";
import Card from "../Card";

const Recommendation = ({ recommendation, singleHotel }) => {
  return (
    <>
      {recommendation && recommendation.length > 1 ? (
        <Section section="similar_section" wrapper="hotel_similar-wrapper ver">
          <div className="hotel_similar-tour">Похожие отели</div>
          <div className="hotel_similar_text">
            Мы подобрали вам похожие отели. Взгляните, чтобы сравнить
          </div>
          <div className="hotel_similar-body">
            {recommendation?.map((recomm) => {
              if (recomm._id !== singleHotel._id)
                return (
                  <>
                    {recomm &&
                      recomm._id !== singleHotel &&
                      singleHotel._id && (
                        <Card
                          isHotel
                          id={recomm._id}
                          key={recomm._id}
                          comforts={recomm.comforts}
                          location={`${
                            recomm.locationId && recomm.locationId.locationName
                          }, ${
                            recomm.locationId &&
                            recomm.locationId.locationCountry
                          }`}
                          name={recomm.name}
                          stars={recomm.hotelStars}
                          food={recomm.food && recomm.food.value}
                          duration={`${recomm.enterTime} - ${recomm.leaveTime}`}
                          image={
                            "https://www.state.gov/wp-content/uploads/2019/04/Kazakhstan-2426x1406.jpg"
                          }
                        />
                      )}
                  </>
                );
            })}
          </div>
        </Section>
      ) : null}
    </>
  );
};

export default Recommendation;
