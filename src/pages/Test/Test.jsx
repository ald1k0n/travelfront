import { useState } from "react";

import Selector2 from "../AddHotel/Selector";

const foodData = [
  {
    value: "Bear",
    label: "Bear",
  },
  {
    value: "Chicken",
    label: "Chicken",
  },
  {
    value: "Fish",
    label: "Fish",
  },
];

const Test = () => {
  const [food, setFood] = useState();

  console.log(food, "food");

  return (
    <div>
      <Selector2 data={foodData} onChange={setFood} value={food} />
    </div>
  );
};

export default Test;
