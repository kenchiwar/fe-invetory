import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/endpoint";
import MainLayout from "@components/Layout/MainLayout";
import NotFoundPage from "@pages/NotFound";
// this use code  Code Splitting để load dử liệu page ít lại tra gg đi
const HomePage = lazy(() => import("@pages/Home"));
const ReadPage = lazy(() => import("@pages/Read"));
const RouterQuery = lazy(() => import("@pages/RouterQuery"));
const BrandList = lazy(() => import("@pages/BrandList"));
const CurrentStockPage = lazy(() => import("@pages/CurrentStock"));
// end this use code

const routes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "read",
        element: <ReadPage />
      },
      {
        path: "route",
        element: <RouterQuery />
      },
      {
        path: "Brand",
        element: <BrandList />
      },
      {
        path: "current-stock",
        element: <CurrentStockPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export default routes;
