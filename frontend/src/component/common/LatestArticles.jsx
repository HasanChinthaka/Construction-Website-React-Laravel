import React, { useEffect, useState } from "react";
import { fileUrl } from "./http";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);

  const fetchLatestArticles = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-latest-articles?limit=3`, {
      method: "GET",
    });
    const result = await res.json();
    console.log(result);
    setArticles(result.data);
  };

  useEffect(() => {
    fetchLatestArticles();
  }, []);
  return (
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
                        alt={article.title}
                        className="w-100"
                      />
                    </div>
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <Link to={`/article/${article.id}`} className="title">
                          {article.title}
                        </Link>
                      </div>
                      <Link to={`/article/${article.id}`} className="btn btn-primary small">
                        Read More
                      </Link>
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

export default LatestArticles;
