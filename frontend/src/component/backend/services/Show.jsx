import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import SideBar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { token } from "../../common/http";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Show = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    setServices(result?.data);
  };

  const deleteService = async (id) => {
    if (confirm("Are you want to delete?")) {
      const api_url = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${api_url}/services/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newServices = services.filter((service) => service.id !== id);
        setServices(newServices);
        toast.success(result.message);
      } else {
        toast.error(result.errors);
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-3">
              {/* sidebar */}
              <SideBar />
            </div>
            <div className="col-md-9">
              {/* dashboard */}
              <div className="card shadow boarder-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Services</h4>
                    <Link
                      to="/admin/services/create"
                      className="btn btn-primary"
                    >
                      Create
                    </Link>
                  </div>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services &&
                        services.map((service) => {
                          return (
                            <tr key={`service-${service.id}`}>
                              <td>{service.id}</td>
                              <td>{service.title}</td>
                              <td>{service.slug}</td>
                              <td>
                                {service.status == 1 ? "Active" : "Block"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/services/edit/${service.id}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  Edite
                                </Link>
                                <Link
                                  onClick={() => deleteService(service.id)}
                                  className="btn btn-secondary btn-sm ms-2"
                                >
                                  Delete
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
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

export default Show;
