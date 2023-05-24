import { useMediaQuery } from "react-responsive";

import DesktopRoute from "./DesktopRoute";
import MobileRotue from "./MobileRotue";

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 600px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
      <DesktopRoute />
      {/* {isDesktopOrLaptop && <DesktopRoute />} */}
      {/* {isTabletOrMobile && <MobileRotue />} */}
    </>
  );
}

export default App;
