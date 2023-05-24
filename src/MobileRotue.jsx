import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MobileLayout from "./moble/components/Layout/Layout";
import Loader from "./moble/components/Loader/Loader";

const MobileHome = lazy(() => import("./moble/pages/Home/Home"));
const Tour = lazy(() => import("./moble/components/Tour/TourCard"));
const Hotel = lazy(() => import("./moble/components/Hotel/Hotel"));

const MobileRotue = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <MobileLayout>
          <Routes>
            <Route path="/" element={<MobileHome />}>
              <Route index path="/tours/*" element={<Tour />} />
              <Route path="/hotel/*" element={<Hotel />} />
            </Route>
          </Routes>
        </MobileLayout>
      </Router>
    </Suspense>
  );
};

export default MobileRotue;
