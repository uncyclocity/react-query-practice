import { Link, Route, Routes } from "react-router-dom";
import { UseQueries, UseQuery } from "./pages";
import Async from "./pages/\basync";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/useQuery">useQuery</Link>
        </li>
        <li>
          <Link to="/useQueries">useQueries</Link>
        </li>
        <li>
          <Link to="/async">async</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/useQuery" element={<UseQuery />} />
        <Route path="/useQueries" element={<UseQueries />} />
        <Route path="/async" element={<Async />} />
      </Routes>
    </div>
  );
}

export default App;
