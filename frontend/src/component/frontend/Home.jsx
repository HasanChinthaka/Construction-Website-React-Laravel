import React from "react";
import AboutImg from "../../assets/images/about-us.jpg";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Services } from "../../constants/services";
import { Projects } from "../../constants/projects";
import Icon1 from "../../assets/images/icon-1.svg";
import { WhyChooseUs } from "../../constants/whyChooseUs";

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
                  <a className="btn btn-primary">Contact Now</a>
                  <a className="btn btn-secondary ms-2">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About section */}
        <section className="section-2 py-5">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6">
                <img src={AboutImg} className="w-100" />
              </div>
              <div className="col-md-6">
                <span>about us</span>
                <h2>Crafting structures that last a lifetime</h2>
                <p>
                  Building enduring structures requires a comprehensive approach
                  that combies advanced materials, resilient design, routine
                  maintenance. and sustainable practices. By drawing on
                  historical insights and utilizing modern technology.
                </p>
                <p>
                  Designing structures that stand the test of time involves a
                  seamless blend of cutting-edge materials. durable design,
                  ongoing upkeep. and eco- friendly practices. By combining
                  lessons from the past with the power of modern technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="section-3 bg-light py-5">
          <div className="container-fluid py-5">
            <div className="section-header text-center">
              <span>our services</span>
              <h2>Our Construction Services</h2>
              <p>
                We offer a diverse array of construction services,spanning
                residential, comercial, and infrastrial proects.
              </p>
            </div>
            <div className="row pt-4">
              {Services.map((service, index) => (
                <div className="col-md-3 col-lg-3" key={index}>
                  <div className="item">
                    <div className="service-image">
                      <img src={service.img_path} alt="" className="w-100" />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{service.title}</h3>
                      </div>
                      <div className="service-content">
                        <p>{service.description}</p>
                      </div>
                      <a href="#" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    <p>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Projects */}
        <section className="section-3 bg-light py-5">
          <div className="container-fluid py-5">
            <div className="section-header text-center">
              <span>our projects</span>
              <h2>Discover our diverse range of projects</h2>
              <p>
                We offer a diverse array of construction services,spanning
                residential, comercial, and infrastrial proects.
              </p>
            </div>
            <div className="row pt-4">
              {Projects.map((project, index) => (
                <div className="col-md-3 col-lg-3" key={index}>
                  <div className="item">
                    <div className="service-image">
                      <img src={project.imag_path} alt="" className="w-100" />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{project.title}</h3>
                      </div>
                      <div className="service-content">
                        <p>{project.description}</p>
                      </div>
                      <a href="#" className="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
