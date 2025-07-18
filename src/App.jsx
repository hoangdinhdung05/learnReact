import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import './assets/css/client/style.css';
import './assets/css/reset.css';
import './assets/css/client/base.css';



function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
