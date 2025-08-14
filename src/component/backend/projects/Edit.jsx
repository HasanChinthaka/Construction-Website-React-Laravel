import React, { useMemo, useRef, useState } from "react";
import Header from "../../common/Header";
import SideBar from "../../common/SideBar";
import Footer from "../../common/Footer";
import JoditEditor from "jodit-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fileUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const Edit = ({ placeholder }) => {
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [project, setProject] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const api_url = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${api_url}/projects/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setContent(result.data.content);
      setProject(result.data);
      console.log(result)
      return {
        title: result.data.title,
        slug: result.data.slug,
        short_desc: result.data.short_desc,
        status: result.data.status,
        location:  result.data.location,
        contruction_type: result.data.contruction_type,
        sector: result.data.sector,
      };
    },
  });
  const onSubmit = async (data) => {
    const newData = { ...data, content: content, imageId: imageId };

    const api_url = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${api_url}/projects/${params.id}`, {
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
      navigate("/admin/projects");
    } else {
      if (result.errors.slug[0]){
        toast.error(result.errors.slug[0]);
      }
      toast.error(result.errors);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

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
                    <h4 className="h5">Projects / Edit</h4>
                    <Link to="/admin/projects" className="btn btn-primary">
                      Back
                    </Link>
                  </div>

                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        {...register("title", {
                          required: "The title feild is required",
                        })}
                        type="text"
                        placeholder="Title"
                        className={`form-control ${
                          errors.title && "is-invalid"
                        }`}
                      />
                      {errors.title && (
                        <p className="invalid-feedback">
                          {errors.title?.message}
                        </p>
                      )}
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        slug
                      </label>
                      <input
                        {...register("slug", {
                          required: "The slug feild is required",
                        })}
                        type="text"
                        placeholder="Slug"
                        className={`form-control ${
                          errors.slug && "is-invalid"
                        }`}
                      />
                      {errors.slug && (
                        <p className="invalid-feedback">
                          {errors.slug?.message}
                        </p>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="m-3">
                          <label htmlFor="" className="form-label">
                            Location
                          </label>
                          <input
                            {...register("location")}
                            type="text"
                            placeholder="Location"
                            className={`form-control`}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="m-3">
                          <label htmlFor="" className="form-label">
                            Contruction Type
                          </label>
                          <select
                            {...register("contruction_type")}
                            className="form-control"
                          >
                            <option value="">Construction Type</option>
                            <option value="Residential construction">
                              Residential construction
                            </option>
                            <option value="Commercial construction">
                              Commercial construction
                            </option>
                            <option value="Industrial construction">
                              Industrial construction
                            </option>
                            <option value="Infrastructure construction">
                              Infrastructure construction
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="m-3">
                          <label htmlFor="" className="form-label">
                            Sector
                          </label>
                          <select
                            {...register("sector")}
                            className="form-control"
                          >
                            <option value="">Sector</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Corporate">Corporate</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="m-3">
                          <label htmlFor="" className="form-label">
                            Status
                          </label>
                          <select
                            {...register("status")}
                            className="form-control"
                          >
                            <option value="1">Active</option>
                            <option value="2">Block</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Short Description
                      </label>
                      <textarea
                        type="text"
                        {...register("short_desc")}
                        placeholder="Short Description"
                        className="form-control"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Content
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {}}
                      />
                    </div>

                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <br />
                      <input type="file" onChange={handleFile} />
                      <div className="pb-3">
                        {project.image && (
                          <img
                            src={
                              fileUrl +
                              "uploads/projects/small/" +
                              project.image
                            }
                            alt=""
                          />
                        )}
                      </div>
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
