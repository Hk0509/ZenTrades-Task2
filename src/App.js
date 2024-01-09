
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Table from './Table'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/data" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
