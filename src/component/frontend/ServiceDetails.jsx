import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import SubHero from "../common/SubHero";
import { Link, useParams } from "react-router-dom";
import { fileUrl } from "../common/http";
import { toast } from "react-toastify";
import Testimonials from "../common/Testimonials";

const ServiceDetails = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [services, setServices] = useState([]);
  const params = useParams();

  const fetchServices = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-services`, {
      method: "GET",
    });
    const result = await res.json();
    setServices(result.data);
  };
  const fetchService = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-service/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    if (result.status == true) {
      setServiceDetails(result.data);
    } else {
      toast.error(result.errors);
    }
    console.log(serviceDetails);
  };

  useEffect(() => {
    fetchService();
    fetchServices();
  }, [params.id]);
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading={`${serviceDetails.title}`}
        />
        <section className="section-10">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    <ul>
                      {services &&
                        services.map((service) => {
                          return (
                            <li key={service.id}>
                              <Link to={`/service/${service.id}`}>
                                {service.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Service Details Section */}
              <div className="col-md-9">
                <div>
                  <img
                    src={`${fileUrl}uploads/services/large/${serviceDetails.image}`}
                    alt=""
                    className="w-100"
                  />
                  <h3 className="py-3">{serviceDetails.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: serviceDetails.content }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-11 bg-light py-5">
          <Testimonials />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetails;
