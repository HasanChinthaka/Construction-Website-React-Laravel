import React, { useMemo, useRef, useState } from "react";
import Header from "../../common/Header";
import SideBar from "../../common/SideBar";
import Footer from "../../common/Footer";
import JoditEditor from "jodit-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fileUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [member, setMember] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const api_url = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${api_url}/members/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setMember(result.data);
      return {
        name: result.data.name,
        job_title: result.data.job_title,
        linkedin_url: result.data.linkedin_url,
        status: result.data.status,
      };
    },
  });
  const onSubmit = async (data) => {
    const newData = { ...data, content: content, imageId: imageId };

    const api_url = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${api_url}/members/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();
    if (result.status == true) {
      toast.success(result.message);
      navigate("/admin/members");
    } else {
      if (result.errors.slug[0]) {
        toast.error(result.errors.slug[0]);
      }
      toast.error(result.errors);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    setIsDisable(true);

    const api_url = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${api_url}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setIsDisable(false);
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
        }
      });
  };

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
                    <h4 className="h5">Members / Edit</h4>
                    <Link to="/admin/members" className="btn btn-primary">
                      Back
                    </Link>
                  </div>

                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        {...register("name", {
                          required: "The name feild is required",
                        })}
                        type="text"
                        placeholder="Name"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                      />
                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Job Title
                      </label>
                      <input
                        {...register("job_title", {
                          required: "The job title feild is required",
                        })}
                        type="text"
                        placeholder="Job Title"
                        className={`form-control ${
                          errors.job_title && "is-invalid"
                        }`}
                      />
                      {errors.slug && (
                        <p className="invalid-feedback">
                          {errors.slug?.message}
                        </p>
                      )}
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Linkedin Profile URL
                      </label>
                      <input
                        {...register("linkedin_url")}
                        type="text"
                        placeholder="Linkedin Profile URL"
                        className={`form-control`}
                      />
                    </div>

                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <br />
                      <input type="file" onChange={handleFile} />
                      <div className="py-3">
                        {member.image && (
                          <img
                            src={
                              fileUrl +
                              "uploads/members/" +
                              member.image
                            }
                            alt=""
                          />
                        )}
                      </div>
                    </div>

                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select {...register("status")} className="form-control">
                        <option value="1">Active</option>
                        <option value="2">Block</option>
                      </select>
                    </div>

                    <button disabled={isDisable} className="btn btn-primary">
                      Update
                    </button>
                  </form>
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

export default Edit;
