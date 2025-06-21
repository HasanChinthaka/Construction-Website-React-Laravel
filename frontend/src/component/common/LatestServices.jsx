import React, { useEffect, useState } from "react";
import { fileUrl } from "./http";

const LatestServices = () => {
  const [services, setServices] = useState([]);

  const fetchLatestServices = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-latest-services?limit=4`, {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
    console.log(services);
  };

  useEffect(() => {
    fetchLatestServices();
  }, []);
  return (
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
          {services &&
            services.map((service) => {
              return (
                <div className="col-md-3 col-lg-3" key={service.id}>
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={`${fileUrl}uploads/services/small/${service.image}`}
                        alt={service.title}
                        className="w-100"
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
  );
};

export default LatestServices;
