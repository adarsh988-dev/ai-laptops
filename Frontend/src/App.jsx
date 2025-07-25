import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Admin from "./pages/AdminLogin";
import Home from "./pages/Home";
import ProtectedAdmin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
