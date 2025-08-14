import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideBar from "../common/SideBar";
import { fileUrl } from "../common/http";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Dashboard = () => {
  const [projects, setProjects] = useState();
  const [articles, setArticles] = useState();
  const [members, setMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const fetchProjects = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-projects`, {
      method: "GET",
    });
    const result = await res.json();
    setProjects(result.data.length);
  };

  const fetchArticles = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-articles`, {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data.length);
  };

  const fetchMembers = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-members`, {
      method: "GET",
    });
    const result = await res.json();
    setMembers(result.data);
  };

  const fetchTestimonials = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-testimonials`, {
      method: "GET",
    });
    const result = await res.json();
    setTestimonials(result.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchArticles();
    fetchMembers();
    fetchTestimonials();
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <SideBar />
            </div>

            {/* Main Dashboard */}
            <div className="col-md-9">
              {/* Stats Row */}
              <div className="row mb-4">
                <div className="col-sm-6 col-lg-3">
                  <div className="card shadow border-0 text-center">
                    <div className="card-body">
                      <h6 className="card-title">Projects</h6>
                      <h4>{projects || 0}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card shadow border-0 text-center">
                    <div className="card-body">
                      <h6 className="card-title">Articles</h6>
                      <h4>{articles || 0}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card shadow border-0 text-center">
                    <div className="card-body">
                      <h6 className="card-title">Testimonials</h6>
                      <h4>{testimonials.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card shadow border-0 text-center">
                    <div className="card-body">
                      <h6 className="card-title">Team Members</h6>
                      <h4>{members.length}</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials & Members Section */}
              <div className="row">
                {/* Testimonials */}
                <div className="col-lg-8 mb-4">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Testimonials</h5>
                      <Swiper
                        modules={[Pagination, Autoplay]}
                        // direction="vertical" // vertical scroll
                        spaceBetween={20}
                        slidesPerView={2}
                        autoplay={{
                          delay: 3000, // 3 seconds
                          disableOnInteraction: false, // keep autoplay after manual interaction
                        }}
                        pagination={{ clickable: true }}
                      >
                        {testimonials.map((testimonial) => (
                          <SwiperSlide key={testimonial.id}>
                            <div className="card shadow-sm border-0">
                              <div className="card-body">
                                <div className="d-flex meta mb-2">
                                  <div className="pt-1">
                                    <img
                                      src={`${fileUrl}uploads/testimonials/${testimonial.image}`}
                                      alt=""
                                      width={50}
                                    />
                                  </div>
                                  <div className="ps-2">
                                    <div className="name">
                                      {testimonial.citation}
                                    </div>
                                    <div>{testimonial.designation}</div>
                                  </div>
                                </div>
                                <p className="mb-0 fs-6">
                                  {testimonial.testimonial}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="col-lg-4">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Team Members</h5>
                      {members.map((member) => (
                        <div className="py-2 border-bottom" key={member.id}>
                          <div className="d-flex align-items-center">
                            <img
                              src={`${fileUrl}uploads/members/${member.image}`}
                              alt={member.name}
                              className="rounded-circle me-3 border"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <strong>{member.name}</strong>
                              <div className="text-muted small">
                                {member.job_title}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
