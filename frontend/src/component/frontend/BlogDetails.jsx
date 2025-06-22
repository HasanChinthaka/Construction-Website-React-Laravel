import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import SubHero from "../common/SubHero";
import { Link, useParams } from "react-router-dom";
import { fileUrl } from "../common/http";
import { toast } from "react-toastify";
import Testimonials from "../common/Testimonials";

const BlogDetails = () => {
  const [articleDetails, setArticleDetails] = useState([]);
  const [articles, setArticles] = useState([]);
  const params = useParams();

  const fetchArticles = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-articles`, {
      method: "GET",
    });
    const result = await res.json();
    setArticles(result.data);
  };
  const fetchArticle = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-article/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    if (result.status == true) {
      setArticleDetails(result.data);
    } else {
      toast.error(result.errors);
    }
    console.log(articleDetails);
  };

  useEffect(() => {
    fetchArticle();
    fetchArticles();
  }, [params.id]);
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading="Blog & News"
        />
        <section className="section-12">
          <div className="container py-5">
            <div className="row">
              {/* article Details Section */}
              <div className="col-md-8">
                <h2>{articleDetails.title}</h2>
                <div className="pb-2">
                  by <strong>{articleDetails.author}</strong> on{" "}
                  {articleDetails.created_at}
                </div>
                <div className="pe-md-5 pb-3">
                  <img
                    src={`${fileUrl}uploads/articles/large/${articleDetails.image}`}
                    alt=""
                    className="w-100"
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: articleDetails.content }}
                  ></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-5 py-4">
                    <h3 className="mt-2 mb-3">Latest Blogs</h3>
                    {articles &&
                      articles.map((article) => {
                        return (
                          <div className="d-flex border-bottom pb-3 mb-2" key={article.id}>
                            <div className="pe-3 pb-2">
                                <Link to={`/article/${article.id}`}>
                              <img
                                src={`${fileUrl}uploads/articles/small/${article.image}`}
                                alt=""
                                width={100}
                              />
                                </Link>
                            </div>
                            <Link to={`/article/${article.id}`} className="title">{article.title}</Link>
                            <hr />
                          </div>
                        );
                      })}
                  </div>
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

export default BlogDetails;
