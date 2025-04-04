import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/endpoint";
import MainLayout from "@components/Layout/MainLayout";
import NotFoundPage from "@pages/NotFound";

// Code splitting for lazy loading pages
const HomePage = lazy(() => import("@pages/Home"));
const ReadPage = lazy(() => import("@pages/Read"));
const RouterQuery = lazy(() => import("@pages/RouterQuery"));
const BrandList = lazy(() => import("@pages/BrandList"));
const BrandDetail = lazy(() => import("@pages/BrandList/BrandDetail"));
const CurrentStockPage = lazy(() => import("@pages/CurrentStock"));

// Define all application routes with proper hierarchy
export const WEB_ENPOINT = {
  Home: "/",
  Read: "/read",
  Route: "/route",
  Brand: {
    index: "/Brand",
    id: "/Brand/:id"
  },
  CurrentStock: {
    index: "/current-stock"
  },
};

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
      // Brand routes
      {
        path: "Brand",
        element: <BrandList />
      },
      {
        path: "Brand/:id",
        element: <BrandDetail />
      },
      // Current Stock routes
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
