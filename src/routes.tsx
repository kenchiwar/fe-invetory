import { RouteObject } from "react-router-dom";
import HomePage from "./pages/Home";
import ReadPage from "./pages/Read";
import NotFoundPage from "./pages/NotFound";
import MainLayout from "./Components/Layout/MainLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Read", element: <ReadPage /> }
    ]
  },
  { path: "*", element: <NotFoundPage /> }
];

export default routes;