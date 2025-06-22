import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/frontend/Home";
import About from "./component/frontend/About";
import "./assets/css/style.scss";
import Services from "./component/frontend/Services";
import Projects from "./component/frontend/Projects";
import Blogs from "./component/frontend/Blogs";
import Contact from "./component/frontend/Contact";
import Login from "./component/backend/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./component/backend/Dashboard";
import RequireAuth from "./component/common/RequireAuth";

import {default as ShowService} from "./component/backend/services/Show";
import {default as CreateService} from "./component/backend/services/Create";
import {default as EditService} from "./component/backend/services/Edit";

import {default as ShowProject} from "./component/backend/projects/Show";
import {default as CreateProject} from "./component/backend/projects/Create";
import {default as EditProjects} from "./component/backend/projects/Edit";

import {default as ShowArticles} from "./component/backend/articles/Show";
import {default as CreateArticles} from "./component/backend/articles/Create";
import {default as EditArticles} from "./component/backend/articles/Edit";

import {default as ShowTestimonials} from "./component/backend/testimonials/Show";
import {default as CreateTestimonials} from "./component/backend/testimonials/Create";
import {default as EditTestimonials} from "./component/backend/testimonials/Edit";

import {default as ShowMembers} from "./component/backend/members/Show";
import {default as CreateMembers} from "./component/backend/members/Create";
import {default as EditMembers} from "./component/backend/members/Edit";
import ServiceDetails from "./component/frontend/ServiceDetails";
import ProjectDetails from "./component/frontend/ProjectDetails";
import BlogDetails from "./component/frontend/BlogDetails";

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
          <Route path="admin/login" element={<Login />} />
          <Route path="service/:id" element={<ServiceDetails />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="article/:id" element={<BlogDetails />} />

          <Route
            path="admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route
            path="admin/services"
            element={
              <RequireAuth>
                <ShowService />
              </RequireAuth>
            }
          />

          <Route
            path="admin/services/create"
            element={
              <RequireAuth>
                <CreateService />
              </RequireAuth>
            }
          />

          <Route
            path="admin/services/edit/:id"
            element={
              <RequireAuth>
                <EditService />
              </RequireAuth>
            }
          />

          <Route
            path="admin/projects"
            element={
              <RequireAuth>
                <ShowProject />
              </RequireAuth>
            }
          />

          <Route
            path="admin/projects/create"
            element={
              <RequireAuth>
                <CreateProject />
              </RequireAuth>
            }
          />
        
          <Route
            path="admin/projects/edit/:id"
            element={
              <RequireAuth>
                <EditProjects />
              </RequireAuth>
            }
          />

          <Route
            path="admin/articles"
            element={
              <RequireAuth>
                <ShowArticles />
              </RequireAuth>
            }
          />

          <Route
            path="admin/articles/create"
            element={
              <RequireAuth>
                <CreateArticles />
              </RequireAuth>
            }
          />
        
          <Route
            path="admin/articles/edit/:id"
            element={
              <RequireAuth>
                <EditArticles />
              </RequireAuth>
            }
          />

          <Route
            path="admin/testimonials"
            element={
              <RequireAuth>
                <ShowTestimonials />
              </RequireAuth>
            }
          />

          <Route
            path="admin/testimonials/create"
            element={
              <RequireAuth>
                <CreateTestimonials />
              </RequireAuth>
            }
          />
        
          <Route
            path="admin/testimonials/edit/:id"
            element={
              <RequireAuth>
                <EditTestimonials />
              </RequireAuth>
            }
          />

          <Route
            path="admin/members"
            element={
              <RequireAuth>
                <ShowMembers />
              </RequireAuth>
            }
          />

          <Route
            path="admin/members/create"
            element={
              <RequireAuth>
                <CreateMembers />
              </RequireAuth>
            }
          />
        
          <Route
            path="admin/members/edit/:id"
            element={
              <RequireAuth>
                <EditMembers />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
