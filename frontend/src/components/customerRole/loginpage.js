import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../css/login.css";
import Swal from "sweetalert2";

const eye = <FontAwesomeIcon icon={faEye} />;
const sleye = <FontAwesomeIcon icon={faEyeSlash} />;

export default function Login(props) {
  const refreshToken = async () => {
    try {
      const res = await axios.post("/refresh", {
        token: customer.refreshToken,
      });
      setCustomer({
        ...customer,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // axios.interceptors.request.use( async(config)=>{

  //         let currentDate = new Date();

  // }
  // );

  //remember me

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    setRememberMe(value);
  };

  const [passwordShown, setPasswordShown] = useState(false);



  // Password toggle handler
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let [customer, setCustomer] = useState(null);
  let [Username, setUsername] = useState("");
  let [Password, setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    function RememberMe() {
      if (localStorage.getItem("rememberMe") === "true") {
        setUsername(localStorage.getItem("Username"));
      } else {
        setUsername("");
      }
    }

    RememberMe();
    // displayStudentdetails();
  }, []);

  function loginUser(e) {
    e.preventDefault();

    const loginCredentials = {
      Username,
      Password,
    };

    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("Username", rememberMe ? Username : "");

    axios
      .post("http://localhost:8070/Customer/loginCustomer", loginCredentials)
      .then((res) => {
        setCustomer(res.data.customerLogin);
        localStorage.setItem("CustomerID", res.data.customerLogin._id);

        // sessionStorage.setItem('userID',"sss");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });

        props.history.push("/customer/home");
        // alert("Customer loggin Successfully!");
        //console.log("logging success");
        ///console.log(res.data);
        setErrorMsg("");
        // props.history.push("/Customer/Home");
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
        // alert(err.response.data.error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Check Your Username & Password!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setErrorMsg(err.response.data.error);
      });
  }

  // function navCheck(){

  //     navigate('/cart');
  // }

  return (
    <div className="loginpage">
      <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div class="container">
          <div class="card login-card">
            <div class="row no-gutters">
              <div class="col-md-5">
                <img
                  src="https://images.unsplash.com/photo-1598233845720-008543fa485c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=363&q=80"
                  alt="login"
                  class="login-card-img"
                />
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <div class="brand-wrapper" style={{ display: "flex" }}>
                    <img
                      src={"images/KaushalOfficialLogo.jpeg"}
                      alt="logo"
                      class="logo"
                    ></img>
                    <h5
                      style={{
                        fontWeight: "bold",
                        paddingLeft: "8px",
                        paddingTop: "6px",
                      }}
                    >
                      KAUSHAL RASHMIKA
                    </h5>
                  </div>
                  <p class="login-card-description">Sign into your account</p>
                  <h6
                    id="CusLoginError"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {errorMsg}
                  </h6>
                  <form onSubmit={loginUser}>
                    {/* Username label & input field  */}

                    <div class="form-group">
                      <label for="email" className="sr-only">
                        Username
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        defaultValue={Username}
                        name="Username"
                        onChange={handleChange}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        required
                      />
                    </div>

                    {/* Password label & input field  */}

                    <div class="form-group mb-4">
                      <label for="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        placeholder="Password"
                        type={passwordShown ? "text" : "password"}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                      <span class="p-viewer">
                        <i
                          style={{ color: "#764A34" }}
                          className={`fa ${
                            passwordShown ? "fa-eye" : "fa-eye-slash"
                          } password-icon`}
                          onClick={togglePasswordVisiblity}
                        >
                          {" "}
                        </i>
                      </span>
                    </div>

                    {/* Remember me */}

                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        id="customCheck1"
                        type="checkbox"
                        class="custom-control-input"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={handleChange}
                      />
                      <label for="customCheck1" class="custom-control-label">
                        Remember Me{" "}
                      </label>
                    </div>

                    {/* Submit Button */}

                    <input
                      name="login"
                      id="login"
                      class="btn btn-block login-btn mb-4"
                      type="submit"
                      value="Login"
                    />
                  </form>

                  {/* forgot password */}

                  <p class="forgot-password-link">
                    {" "}
                    <Link
                      to="/customer/forgotpassword"
                      style={{ color: "#764A34", fontWeight: "bold" }}
                    >
                      Forgot Password?
                    </Link>
                  </p>

                  {/* Not a member link */}

                  <p class="login-card-footer-text">
                    Don't have an account?{" "}
                    <Link
                      to="/customer/registration"
                      style={{ color: "#764A34" }}
                    >
                      Create One
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <br />
      <br />
    </div>
  );
}
