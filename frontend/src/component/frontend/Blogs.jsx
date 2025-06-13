import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SubHero from "../common/SubHero";
import { Blogs as OurBlogs } from "../../constants/blogs";

const Blogs = () => {
  return (
    <>
      <Header />
      <main>
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading="Blogs"
          text="We excel at transforming visions into reality <br /> through
                        outstanding craftsmanship and precise."
        />
      </main>
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
            {OurBlogs.map((blog, index) => (
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
            {OurBlogs.map((blog, index) => (
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
      <Footer />
    </>
  );
};

export default Blogs;
