import { Routes } from "react-router-dom";
import './App.css';
import Create from './pages/create';
import LoginForm from './pages/login';
import { Route } from "react-router-dom";
import NotFound from "./dashboard/pages/404";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Create />} />
        <Route path="/register" element={<Create />} />
        <Route component={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
