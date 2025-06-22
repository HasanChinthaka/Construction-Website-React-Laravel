import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SubHero from "../common/SubHero";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const api_url = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${api_url}/contact-now`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.status === true) {
      toast.success(result.message);
      reset();
    } else{
      toast.error(result.error);
    }
  };
  return (
    <>
      <Header />
      <main>
        <SubHero
          preHeading="Quality. Intergrity. Value"
          heading="Contact Us"
          text="We excel at transforming visions into reality <br /> through
                        outstanding craftsmanship and precise."
        />
        <section className="section-9 py-5">
          <div className="container">
            <div className="section-header text-center">
              <span></span>
              <h2>Contact Us</h2>
              <p>
                Our dedicated experts are here to help you with any of your
                questions, contact us by <br /> filling out the form below and
                we will be in touch shortly.
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-md-3">
                <div className="card shadow border-0 mb-3">
                  <div className="card-body p-4">
                    <h3>Call Us</h3>
                    <div>
                      <a href="#">888-000-0000</a>
                    </div>
                    <div>
                      <a href="#">222-123-1234</a>
                    </div>

                    <h3 className="mt-3">You can wwrite us:</h3>
                    <div>
                      <a href="#">example@example.com</a>
                    </div>
                    <div>
                      <a href="#">example@example.com</a>
                    </div>

                    <h3>Address:</h3>
                    <div>
                      B-18X. Rajaji Puram <br />
                      Lucknow, Uttar Pradesh, 226017 <br />
                      0522400XXXX
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card shadow border-0">
                  <div className="card-body p-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Name
                          </label>
                          <input
                            {...register("name", {
                              required: "Name is required",
                            })}
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.name && "is-invalid"
                            }`}
                            placeholder="Enter Name"
                          />
                          {errors.name && (
                            <p className="invalid-feedback">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Email
                          </label>
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.email && "is-invalid"
                            }`}
                            placeholder="Enter Email"
                          />
                          {errors.email && (
                            <p className="invalid-feedback">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Phone
                          </label>
                          <input
                            {...register("phone")}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Phone No."
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="" className="form-label">
                            Subject
                          </label>
                          <input
                            {...register("subject")}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="" className="form-label">
                          Message
                        </label>
                        <textarea
                          {...register("message")}
                          name=""
                          rows={5}
                          id=""
                          placeholder="Message"
                          className={`form-control form-control-lg ${
                            errors.message && "is-invalid"
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="invalid-feedback">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                      <button className="btn btn-primary large mt-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
