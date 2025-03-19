import {
  BrowserRouter, useRoutes
} from "react-router-dom";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from 'react-redux';
import { store } from './redux/store';
function AppRoutes () {
  return useRoutes(routes);
}
function App () {
  return (
    <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
    </Provider>
  );
}

export default App;
