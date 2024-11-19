import "./App.css";
import { Navbar } from "../shared/ui/NavbarMain/index.ts";
import { AppRouter } from "../components/AppRouter/index.ts";

function App() {
  return (
    <>
      <Navbar />

      <AppRouter />
    </>
  );
}
export default App;
