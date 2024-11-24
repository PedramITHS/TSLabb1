import { Routes, Route, Navigate } from "react-router-dom";
// import Forms from "./pages/Forms";
import Games from "./pages/Games";
import Search from "./components/Search";
import Postform from "./pages/Postform";
import Patchform from "./pages/Patchform";
import Delform from "./pages/Delform";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "55px", paddingBottom: "25px", flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Games />} />
          <Route
            path="/search"
            element={<Search onSearch={(e) => console.log(e)} />}
          />
          <Route path="/post" element={<Postform />} />
          <Route path="/patch" element={<Patchform />} />
          <Route path="/delete" element={<Delform />} />
          {/* Redirect to root with unrecognizable paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
