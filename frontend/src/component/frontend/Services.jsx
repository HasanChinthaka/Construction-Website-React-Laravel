import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SubHero from "../common/SubHero";
import { Services as OurServices } from "../../constants/services";

const Services = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        |
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading="Services"
          text="We excel at transforming visions into reality <br /> through
                outstanding craftsmanship and precise."
        />
        {/* Our Services */}
        <section className="section-3 bg-light py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>our services</span>
              <h2>Our Construction Services</h2>
              <p>
                We offer a diverse array of construction services,spanning
                residential, comercial, and infrastrial proects.
              </p>
            </div>
            <div className="row pt-4 m-5">
              {OurServices.map((service, index) => (
                <div
                  className="col-md-6 col-lg-6 align-items-center justify-content-center"
                  key={index}
                >
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={service.img_path}
                        alt=""
                        className="w-100 "
                        style={{ height: "50vh"}}
                      />
                    </div>

                    <div className="service-body">
                      <div className="service-title">
                        <h3>{service.title}</h3>
                      </div>
                      <div className="service-content">
                        <p>{service.description}</p>
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
      </main>
      <Footer />
    </>
  );
};

export default Services;
