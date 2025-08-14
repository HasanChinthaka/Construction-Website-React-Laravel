import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import SideBar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { token } from "../../common/http";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Show = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    const res = await fetch(`${api_url}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();
    setMembers(result?.data);
  };

  const deleteMembers = async (id) => {
    if (confirm("Are you want to delete?")) {
      const api_url = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${api_url}/members/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();

      if (result.status == true) {
        const newmembers = members.filter((service) => service.id !== id);
        setMembers(newmembers);
        toast.success(result.message);
      } else {
        toast.error(result.errors);
      }
    }
  };

  useEffect(() => {
    fetchMembers();
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
                    <h4 className="h5">Members</h4>
                    <Link
                      to="/admin/members/create"
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
                        <th>Jub Title</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members &&
                        members.map((member) => {
                          return (
                            <tr key={`member-${member.id}`}>
                              <td>{member.id}</td>
                              <td>{member.name}</td>
                              <td>{member.job_title}</td>
                              <td>
                                {member.status == 1 ? "Active" : "Block"}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/members/edit/${member.id}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  Edite
                                </Link>
                                <Link
                                  onClick={() => deleteMembers(member.id)}
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
