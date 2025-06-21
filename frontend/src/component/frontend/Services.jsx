import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SubHero from "../common/SubHero";
import { fileUrl } from "../common/http";

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-services`, {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
    console.log(services);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
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
              {services &&
                services.map(service => {
                  return (
                    <div
                      className="col-md-4 col-lg-4"
                      key={service.id}
                    >
                      <div className="item">
                        <div className="service-image">
                          <img
                            src={`${fileUrl}uploads/services/small/${service.image}`}
                            alt={service.title}
                            className="w-100 "
                          />
                        </div>

                        <div className="service-body">
                          <div className="service-title">
                            <h3>{service.title}</h3>
                          </div>
                          <div className="service-content">
                            <p>{service.short_desc}</p>
                          </div>
                          <a href="#" className="btn btn-primary small">
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
