import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './pages/Home';
import ReadPage from './pages/Read';
import NotFoundPage from './pages/NotFound'
function App() {
  return (
    <BrowserRouter>
    <Routes>
<Route path="/" element={<HomePage />}></Route>
<Route path="/Read" element={<ReadPage />}></Route>
<Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
