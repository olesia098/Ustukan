import { useLocation } from "react-router-dom";
import RoutesMenu from "./routes/RoutesMenu";
import Navbar from "./ui/Navbar";

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col">
      {location.pathname === "/igoradmin908711542/" ? "" : <Navbar />}
      <RoutesMenu />
    </div>
  );
}

export default App;
