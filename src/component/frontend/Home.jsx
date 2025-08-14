import React, { useEffect, useState } from "react";
import AboutImg from "../../assets/images/about-us.jpg";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Services } from "../../constants/services";
import { Projects } from "../../constants/projects";
import { WhyChooseUs } from "../../constants/whyChooseUs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Reviews } from "../../constants/reviews";
import { Blogs } from "../../constants/blogs";
import AboutUs from "../common/AboutUs";
import LatestServices from "../common/LatestServices";
import LatestProjects from "../common/LatestProjects";
import LatestArticles from "../common/LatestArticles";
import Testimonials from "../common/Testimonials";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome Amazing Constructions</span>
                <h1>
                  Crafting dreams with <br />
                  precision and excellence .
                </h1>
                <p>
                  We excel at transforming visions into reality through
                  outstanding craftsmanship and precise <br /> attention to
                  detail. With years of experience and a dedication to quality.
                </p>
                <div className="mt-4">
                  <a href="/contact-us" className="btn btn-primary large">Contact Now</a>
                  <a href="/projects" className="btn btn-secondary large ms-2">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About section */}
        <AboutUs />

        {/* Our Services */}
        <LatestServices />

        {/* Why Choose Us */}
        <section className="section-4 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Why Choose Us</span>
              <h2>Discover our wide variety of projects</h2>
              <p>
                Created in close partnership with our clients and collaborators,
                this approach merges industry expertise, <br />
                decades of experience, innovation, and flexibility to
                consistently deliver excellence.
              </p>
            </div>
            <div className="row pt-4">
              {WhyChooseUs.map((item, index) => (
                <div className="col-md-4">
                  <div className="card shadow border-0 p-4">
                    <div className="card-icon">
                      <img src={item.icon} alt="" />
                    </div>
                    <div className="card-title mt-3">
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Projects */}
        <LatestProjects />

        {/* Testimonials */}
        <Testimonials />
        
        {/* blogs & news */}
        <LatestArticles />
      </main>
      <Footer />
    </>
  );
};

export default Home;
