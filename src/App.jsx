import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./pages/sections/Header";
import Index from "./pages/Index";
import Introduccion from "./pages/Introduccion";
import Introduccion2 from "./pages/Introduccion2";
import SlideNavigator from "./pages/sections/SlideNavigator";
import EvaluacionCurso from "./pages/Evaluacion";
function Module() {
  return (
    <>
      <Header />
      <SlideNavigator />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="p-0 m-0 font-main">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/introduccion" element={<Introduccion />} />
          {/* <Route path="/introduccion2" element={<Introduccion2 />} /> */}
          <Route path="/slides" element={<Module />} />
          <Route path="/evaluación" element={<EvaluacionCurso />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
