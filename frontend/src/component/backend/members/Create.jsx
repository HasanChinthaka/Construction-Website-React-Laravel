import Header from "../../common/Header";
import SideBar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { token } from "../../common/http";
import { toast } from "react-toastify";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Create = () => {
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);

  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newData = { ...data, content: content, imageId: imageId };

    const api_url = import.meta.env.VITE_API_BASE_URL;

    console.log(newData);
    const res = await fetch(`${api_url}/members`, {
      method: "POST",
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
          console.log(imageId);
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
                    <h4 className="h5">Members / Create</h4>
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
                      {errors.job_title && (
                        <p className="invalid-feedback">
                          {errors.job_title?.message}
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
                      Submit
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

export default Create;
