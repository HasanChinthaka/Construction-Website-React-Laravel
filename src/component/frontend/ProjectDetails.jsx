import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import SubHero from "../common/SubHero";
import { Link, useParams } from "react-router-dom";
import { fileUrl } from "../common/http";
import { toast } from "react-toastify";
import Testimonials from "../common/Testimonials";

const ProjectDetails = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [projects, setProjects] = useState([]);
  const params = useParams();

  const fetchProjects = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-projects`, {
      method: "GET",
    });
    const result = await res.json();
    setProjects(result.data);
  };
  const fetchProject = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/get-project/${params.id}`, {
      method: "GET",
    });
    const result = await res.json();
    if (result.status == true) {
      setProjectDetails(result.data);
    } else {
      toast.error(result.errors);
    }
    console.log(ProjectDetails);
  };

  useEffect(() => {
    fetchProject();
    fetchProjects();
  }, [params.id]);
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading={`${projectDetails.title}`}
        />
        <section className="section-10">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Insights</h3>
                    <ul>
                      {/* {projects &&
                        projects.map((project) => {
                          return (
                            <li key={project.id}>
                              <Link to={`/project/${project.id}`}>
                                {project.title}
                              </Link>
                            </li>
                          );
                        })} */}
                      {projectDetails.location && (
                        <li className="mb-2">
                          <span className="text-body-secondary">Location</span>
                          <p>{projectDetails.location}</p>
                        </li>
                      )}

                      {projectDetails.contruction_type && (
                        <li className="mb-2">
                          <span className="text-body-secondary">
                            Construction Type
                          </span>
                          <p>{projectDetails.contruction_type}</p>
                        </li>
                      )}

                      {projectDetails.sector && (
                        <li className="mb-2">
                          <span className="text-body-secondary">Sector</span>
                          <p>{projectDetails.sector}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* project Details Section */}
              <div className="col-md-8">
                <div>
                  <img
                    src={`${fileUrl}uploads/projects/large/${projectDetails.image}`}
                    alt=""
                    className="w-100"
                  />
                  <h3 className="py-3">{projectDetails.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: projectDetails.content }}
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

export default ProjectDetails;
