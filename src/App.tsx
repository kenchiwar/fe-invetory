import {
  BrowserRouter, useRoutes
} from "react-router-dom";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
function AppRoutes () {
  return useRoutes(routes);
}
function App () {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
