import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/frontend/Home";
import About from "./component/frontend/About";
import './assets/css/style.scss';
import Services from "./component/frontend/Services";
import Projects from "./component/frontend/Projects";
import Blogs from "./component/frontend/Blogs";
import Contact from "./component/frontend/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
