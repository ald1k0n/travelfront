import React from "react";
import RoomRow from "../AddHotel/RoomRow";
import CampRow from "./CampRow";
import Section from "../../components/Section";

const CampTable = ({ agePrices, periods, campId }) => {
  return (
    <Section section="tb_section" wrapper="tb_wrapper ver shadowed_box">
      <div className="gen_title">Возраста</div>
      <div className="table_wrapper">
        <table className="periods_table">
          <thead>
            <tr>
              <th>Возраста и периоды</th>
              {periods &&
                periods?.length > 0 &&
                periods?.map((period) => (
                  <th key={period._id}>
                    {period.startDay}.{period.startMonth} - {period.endDay}.
                    {period.endMonth}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {agePrices &&
              agePrices?.map((age) => <CampRow campId={campId} age={age} />)}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default CampTable;
