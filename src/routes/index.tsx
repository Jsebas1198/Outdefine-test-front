import * as React from "react";
import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";

const MainPage = React.lazy(() => import("../pages/MainPage"));

export default function Routes(): JSX.Element {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <ReactRoutes>
          <Route path="/" element={<MainPage />} />
        </ReactRoutes>
      </BrowserRouter>
    </React.Suspense>
  );
}
