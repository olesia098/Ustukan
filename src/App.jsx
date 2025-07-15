import RoutesMenu from "./routes/RoutesMenu";
import Navbar from "./ui/Navbar";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <RoutesMenu/>
    </div>
  );
}

export default App;
