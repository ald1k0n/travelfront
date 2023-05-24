import React from "react";
import Section from "../../components/Section";
import TourRow from "./TourRow";

const TourTable = ({ periodPrices, tourId, tourData }) => {
  return (
    <Section section="tb_section" wrapper="tb_wrapper ver shadowed_box">
      <div className="gen_title">Цены</div>
      <div className="table_wrapper">
        <table className="periods_table">
          <thead>
            <tr>
              <th>Возраста и периоды</th>
              {periodPrices &&
                periodPrices?.length > 0 &&
                periodPrices?.map((per) => (
                  <th key={per._id}>
                    {per?.period?.startDay}.{per?.period?.startMonth} -{" "}
                    {per?.period?.endDay}.{per?.period?.endMonth}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <TourRow
              tourId={tourId}
              periodPrices={periodPrices}
              tourData={tourData}
            />
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default TourTable;
