import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-3">
      <Header />
      <div className="bg-[#FEFEFE] flex justify-center items-center min-h-screen mx-10">
        <p className=" font-semibold border-2 border-[#4690E2]  rounded-4xl text-lg px-12 py-6 sm:text-2xl sm:px-30 sm:py-12">
          {location.pathname}
        </p>
      </div>

      <main>
        <Routes>
          <Route path="*" element={null} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
