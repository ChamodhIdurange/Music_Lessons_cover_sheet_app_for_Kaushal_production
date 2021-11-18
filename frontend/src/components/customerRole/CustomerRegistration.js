import React, { useState } from "react";
import axios from "axios";

export default function CustomerRegistration(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [CpasswordShown, setCPasswordShown] = useState(false);
  const [eyeSlashIcon, setEyeSlashIcon] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [CeyeSlashIcon, setCEyeSlashIcon] = useState(false);
  const [CeyeIcon, setCEyeIcon] = useState(true);
  return (
    <div>
      <br />
      <div className="d-flex justify-content-center">
        <div class="card" style={{ border: "solid #764A34" }}>
          <div class="card-body">
            <div class="text-center">
              <img
                src={"/images/Kaushal_temp_logo.png"}
                class="rounded img-responsive"
                alt="Production_logo"
                style={{ width: "150px" }}
              />
            </div>
            <br />
            <form>
              <div class="text-center">
                <h2 style={{ color: "#764A34" }}>REGISTER HERE</h2>
              </div>
              <br />
              {/* username */}
              <div class="text-center">
                <div class="container-fluid">
                  <div class="form-group row">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style={{ marginRight: "5px" }}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="inputUsername"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* email */}
              <div class="text-center">
                <div class="container-fluid">
                  <div class="form-group row">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style={{ marginRight: "5px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        class="form-control rounded"
                        id="inputEmail"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* contact */}
              <div class="text-center">
                <div class="container-fluid">
                  <div class="form-group row">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style={{ marginRight: "5px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-telephone-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                          />
                        </svg>
                      </span>
                      <input
                        type="number"
                        class="form-control rounded"
                        id="inputContact"
                        placeholder="Contact"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* password */}
              <div class="text-center">
                <div class="container-fluid">
                  <div class="form-group row">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style={{ marginRight: "5px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-lock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                      <input
                        type={passwordShown ? "text" : "password"}
                        style={{
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}
                        class="form-control  border-right-0"
                        id="inputpassword"
                        placeholder="Password"
                      />

                      <span class="input-group-append bg-white border-left-0">
                        <span class="input-group-text bg-transparent">
                          <div hidden={eyeSlashIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-eye-slash-fill"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                setPasswordShown(true);
                                setEyeSlashIcon(true);
                                setEyeIcon(false);
                              }}
                            >
                              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                            </svg>
                          </div>
                          <div hidden={eyeIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-eye-fill"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                setPasswordShown(false);
                                setEyeSlashIcon(false);
                                setEyeIcon(true);
                              }}
                            >
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                          </div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* retype password  */}
              <div class="text-center">
                <div class="container-fluid">
                  <div class="form-group row">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style={{ marginRight: "5px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-lock-fill"
                          viewBox="0 0 16 16"
                    
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                      <input
                        type={CpasswordShown ? "text" : "password"}
                        style={{
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}
                        class="form-control border-right-0"
                        id="inputConfirmPassword"
                        placeholder="Re-type Password"
                      />
                      <span class="input-group-append bg-white border-left-0">
                        <span class="input-group-text bg-transparent">
                          <div hidden = {CeyeSlashIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-eye-slash-fill"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                setCPasswordShown(true);
                                setCEyeSlashIcon(true);
                                setCEyeIcon(false);
                              }}
                          
                            >
                              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                            </svg>
                          </div>
                          <div hidden = {CeyeIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-eye-fill"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                setCPasswordShown(false);
                                setCEyeSlashIcon(false);
                                setCEyeIcon(true);
                              }}
                            >
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                          </div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* first name and last name  */}

              <div class="row">
                <div class="col-sm">
                  <div class="text-center">
                    <div class="container-fluid">
                      <div class="form-group row">
                        <div class="input-group">
                          <span
                            class="input-group-addon"
                            style={{ marginRight: "5px" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            class="form-control rounded"
                            id="inputFirstname"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
                  <div class="text-center">
                    <div class="container-fluid">
                      <div class="form-group row">
                        <div class="input-group">
                          <span
                            class="input-group-addon"
                            style={{ marginRight: "5px" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            class="form-control rounded"
                            id="inputLastname"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* gender */}
              <div className="text-center">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="RadioMale"
                    value="Male"
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="RadioFemale"
                    value="Female"
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="RadioOther"
                    value="Other"
                  />
                  <label class="form-check-label" for="inlineRadio3">
                    Other
                  </label>
                </div>
              </div>
              <br />
              {/* country */}
              <div class="text-center">
                <span style={{ marginRight: "5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-globe"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                  </svg>
                </span>
                <select
                  class="selectpicker countrypicker"
                  id="selectedCountry"
                  style={{
                    width: "10rem",
                    background: "#764A34",
                    color: "#ffffff",
                    borderRadius: "2px",
                  }}
                ></select>
              </div>
              <br />
              {/* terms and condition */}
              <div class="text-center">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="termsCheckbox"
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    Agree to terms and conditions.{" "}
                    <a href="#" className="text-decoration">
                      Click Here
                    </a>
                  </label>
                </div>
              </div>
              <br />
              {/* submit button */}
              <div class="text-center">
                <button
                  type="submit"
                  class="btn"
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
