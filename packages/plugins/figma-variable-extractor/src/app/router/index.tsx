import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import Extract from "../pages/extract";
import Complete from "../pages/complete";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Extract />,
  },
  {
    path: "/complete",
    element: <Complete />,
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
