import React from "react";
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
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary large ms-2">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About section */}
        <AboutUs/>

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

        <section className="section-5 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Testimonials</span>
              <h2>What people are saying about us</h2>
              <p>
                We offer a diverse array of construction services,spanning
                residential, comercial, and infrastrial proects.
              </p>
            </div>
            <Swiper
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {Reviews.map((review, index) => (
                <SwiperSlide>
                  <div className="card shadow border-0" key={index}>
                    <div className="card-body p-5">
                      <div className="rating">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                          ))}
                      </div>
                      <div className="content pt-4 pb-2">
                        <p>{review.review}</p>
                      </div>
                      <hr />
                      <div className="d-flex meta">
                        <div>
                          <img src={review.reviewer_img} alt="" />
                        </div>
                        <div className="ps-2">
                          <div className="name">{review.reviewer_name}</div>
                          <div>{review.reviewer_designation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* blogs & news */}
        <section className="section-6 py-4 bg-light">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Blog & News</span>
              <h2>Articles & blog posts</h2>
              <p>
                We offer a diverse array of construction services,spanning
                residential, comercial, and infrastrial proects.
              </p>
            </div>
            <div className="row pt-3">
              {Blogs.map((blog, index) => (
                <div className="col-md-4 py-4" key={index}>
                  <div className="card shadow border-0">
                    <div className="card-img-top">
                      <img src={blog.img_path} alt="" className="w-100" />
                    </div>
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <a href="#" className="title">
                          {blog.title} {index + 1}
                        </a>
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

export default Home;
