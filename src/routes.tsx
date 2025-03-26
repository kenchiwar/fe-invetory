import { RouteObject  } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/endpoint"
import MainLayout from "@components/Layout/MainLayout";
import NotFoundPage from "@pages/NotFound";
//this use code  Code Splitting để load dử liệu page ít lại tra gg đi
const HomePage = lazy(() => import("@pages/Home"));
const ReadPage = lazy(() => import("@pages/Read"));

//end this use code 

const routes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: (
        <MainLayout />
    ),
    children: [
      {
        index: true,
        element: (
            <HomePage />
        ),
      },
      {
        path: "read",
        element: (
            <ReadPage />
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
        <NotFoundPage />
    ),
  },
];

export default routes;