import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SubHero from "../common/SubHero";
import { fileUrl } from "../common/http";

const Blogs = () => {
  const [articles, setArticles] = useState([]);

  const fetchProjects = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-articles`, {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
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
            {articles &&
              articles.map((article) => {
                return (
                  <div className="col-md-4 py-4" key={article.id}>
                    <div className="card shadow border-0">
                      <div className="card-img-top">
                        <img
                          src={`${fileUrl}uploads/articles/small/${article.image}`}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="card-body p-4">
                        <div className="mb-3">
                          <a href="#" className="title">
                            {article.title}
                          </a>
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
      <Footer />
    </>
  );
};

export default Blogs;
