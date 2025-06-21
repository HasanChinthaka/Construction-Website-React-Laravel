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
  const [testimonial, setTestimonial] = useState("");
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
      const res = await fetch(`${api_url}/testimonials/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      setTestimonial(result.data);

      return {
        testimonial: result.data.testimonial,
        citation: result.data.citation,
        designation: result.data.designation,
        status: result.data.status,
      };
    },
  });
  const onSubmit = async (data) => {
    const newData = { ...data, imageId: imageId };

    const api_url = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${api_url}/testimonials/${params.id}`, {
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
      navigate("/admin/testimonials");
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
                    <h4 className="h5">Testimonials / Edit</h4>
                    <Link to="/admin/testimonials" className="btn btn-primary">
                      Back
                    </Link>
                  </div>

                  <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Testimonials
                      </label>
                      <textarea
                        type="text"
                        {...register("testimonial", {
                          required: "The testimonial feild is required",
                        })}
                        placeholder="Testimonial"
                        className={`form-control ${
                          errors.testimonial && "is-invalid"
                        }`}
                        rows={4}
                      ></textarea>

                      {errors.testimonial && (
                        <p className="invalid-feedback">
                          {errors.testimonial?.message}
                        </p>
                      )}
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Citation
                      </label>
                      <input
                        {...register("citation", {
                          required: "The citation feild is required",
                        })}
                        type="text"
                        placeholder="Citation"
                        className={`form-control ${
                          errors.citation && "is-invalid"
                        }`}
                      />
                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors.citation?.message}
                        </p>
                      )}
                    </div>
                    <div className="m-3">
                      <label htmlFor="" className="form-label">
                        Designation
                      </label>
                      <input
                        {...register("designation")}
                        type="text"
                        placeholder="Designation"
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
                        {testimonial.image && (
                          <img
                            src={
                              fileUrl +
                              "uploads/testimonials/" +
                              testimonial.image
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
