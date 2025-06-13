import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SubHero from "../common/SubHero";
import { Projects as OurProjects } from "../../constants/projects";

const Projects = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading="Our Projects"
          text="We excel at transforming visions into reality <br /> through
                        outstanding craftsmanship and precise."
        />
      </main>
      {/* Our Projects */}
      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>our projects</span>
            <h2>Discover our diverse range of projects</h2>
            <p>
              We offer a diverse array of construction services,spanning
              residential, comercial, and infrastrial proects.
            </p>
          </div>
          <div className="row pt-4">
            {OurProjects.map((project, index) => (
              <div className="col-md-4 col-lg-4" key={index}>
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
                    <a href="#" className="btn btn-primary small">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
