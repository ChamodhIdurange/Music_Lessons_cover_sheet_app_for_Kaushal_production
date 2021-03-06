import React, { useState } from "react";
import PasswordStrengthIndicator from "./passwordStrength";
import axios from "axios";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
const bcrypt = require("bcryptjs");

// import $ from "jquery";

export default function CustomerForgotPassword(props) {
  const [stageOneStatus, setStageOneStatus] = useState(false);
  const [stageTwoStatus, setStageTwoStatus] = useState(true);
  const [stageThreeStatus, setStageThreeStatus] = useState(true);
  const [lockKeyImage, setLockKeyImage] = useState(false);
  const [unlockKeyImage, setUnLockKeyImage] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [CpasswordShown, setCPasswordShown] = useState(false);
  const [eyeSlashIcon, setEyeSlashIcon] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [CeyeSlashIcon, setCEyeSlashIcon] = useState(false);
  const [CeyeIcon, setCEyeIcon] = useState(true);
  const [loading, setLoading] = useState(true);
  const [customerID, setCustomerID] = useState([]);

  const [usernotFoundError, setUserNotFoundError] = useState("");
  const [codeVerification, setCodeVerification] = useState("");
  const [changePStatus, setChangePStatus] = useState(true);
  const [passwordMatchDiv, setPasswordMatchDiv] = useState(true);
  const [passwordMisMatchDiv, setPasswordMisMatchDiv] = useState(true);
  const [resendEmailBtn, setResendEmailBtn] = useState(true);
  const [genCode, setCode] = useState("");
  const [spaceValidation,setSpaceValidation] = useState(true);
  let UserEmail = "";

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });
  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  let c = "";
  async function sendEmail(e) {
    e.preventDefault();
    setCodeVerification("");
    setResendEmailBtn(true);
    setLoading(false);
    UserEmail = document.getElementById("userEmail").value;

    await axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/customer/getEmail/" +
          UserEmail
      )
      .then((res) => {
        if (res.data.length == 0) {
          setLoading(true);
          setUserNotFoundError("User not found!");
        } else if (res.data != null) {
          // console.log(res.data[0]._id)
          setCustomerID(res.data[0]._id);
          setUserNotFoundError("");
          emailConfiguration();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });
  }

  function generateCode(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async function emailConfiguration() {
    const hidEmail = hideEmail(UserEmail);
    const generatedCode = generateCode(8);
    setCode(generatedCode);
    const emailContent = {
      email: UserEmail,
      code: generatedCode,
    };
    await emailjs
      .send(
        "service_d2vcq28", //your service id
        "template_pcwlvj6", // template id
        emailContent,
        "user_TGhnW7M8Z4dNu0PzvbuZ9" //
      )
      .then(
        (result) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Email sent to " + hidEmail,
          });

          setLoading(true);
          if (stageOneStatus == false) {
            setStageTwoStatus(false);
            setStageOneStatus(true);
          }
        },
        (error) => {
          setLoading(true);
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: "Error has been occured please try again!",
          });
        }
      );
  }

  function hideEmail(email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
      for (let i = gp3.length; i > 0; i--) {
        gp2 += "*";
      }
      return gp2;
    });
  }

  function verifyCode() {
    setLoading(false);
    setCodeVerification("");

    const UserCode = document.getElementById("userCode").value;
    if (UserCode == genCode) {
      setLoading(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Code verified successfully",
      });

      setLockKeyImage(true);
      setUnLockKeyImage(false);
      setStageOneStatus(true);
      setStageTwoStatus(true);
      setStageThreeStatus(false);
    } else if (UserCode != genCode) {
      setLoading(true);
      setCodeVerification(
        "Code verification unsuccessful! ( Please try again! )"
      );
      setResendEmailBtn(false);
    }
  }

  function changePassword(e) {
    e.preventDefault();
    setLoading(false);
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();
    if (newPassword != null || confirmPassword != null) {
      if (newPassword === confirmPassword) {
        Swal.fire({
          title: "Do you want to change password ?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
          if (result.isConfirmed) {
            const newPasswordObject = {
              Password: bcrypt.hashSync(
                newPassword.trim(),
                bcrypt.genSaltSync(12)
              ),
            };

            axios
              .put(
                "https://kaushal-rashmika-music.herokuapp.com/customer/updatePassword/" +
                  customerID,
                newPasswordObject
              )
              .then((res) => {
                Swal.fire(
                  "Password Updated!",
                  "You can log back in ",
                  "success"
                );

                setLoading(true);
                props.history.push("/customer/login");
                // navigate to the login page
              })
              .catch((err) => {
                // alert(err);
                Swal.fire("Error has been occured please try again!", "error");
                props.history.push("/customer/login");
              });
          } else {
            setLoading(true);
          }
        });
      } else {
        setLoading(true);
      }
    }
  }

  function hasWhiteSpace(s) {
    return /\s/.test(s);
  }
  return (
    <div>
      <br />
      <div className="d-flex justify-content-center">
        <div
          class="card shadow p-3 mb-5 bg-white rounded"
          style={{ border: "solid #764A34" }}
        >
          <div class="card-body">
            <div class="text-center">
              <div hidden={lockKeyImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
              </div>
              <div hidden={unlockKeyImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  class="bi bi-unlock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                </svg>
              </div>
            </div>
            <br />
            <div class="text-center">
              <h2 style={{ color: "#764A34" }}>FORGOT PASSWORD ?</h2>
            </div>
            <br />
            <div class="text-center">
              <h5 style={{ color: "#000000" }}>
                You can reset your password from here.
              </h5>
              <div class="spinner-border" role="status" hidden={loading}>
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <br />
            {/* enter email field */}
            {/* stage 1 */}
            <div hidden={stageOneStatus}>
              <h6 style={{ textAlign: "center", color: "#D0193A" }}>
                {usernotFoundError}
              </h6>
              <form onSubmit={sendEmail}>
                <div class="input-group">
                  {" "}
                  <span class="input-group-append bg-white border-right-10">
                    <span class="input-group-text bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#764A34"
                        class="bi bi-envelope-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                      </svg>
                    </span>
                  </span>
                  <input
                    class="form-control border-left-0"
                    type="email"
                    id="userEmail"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <br />
                {/* get code btn  */}
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-block"
                    style={{
                      backgroundColor: "#764A34",
                      color: "#ffffff",
                      borderRadius: "8px",
                    }}
                  >
                    Get Code
                  </button>
                </div>
              </form>
            </div>

            {/* stage 2 */}
            <div hidden={stageTwoStatus}>
              <h6 style={{ textAlign: "center", color: "#279B14" }}>
                Enter the code which was in the email
              </h6>
              <h6 style={{ textAlign: "center", color: "#D0193A" }}>
                {codeVerification}
              </h6>
              <div class="input-group">
                {" "}
                <span class="input-group-append bg-white border-right-10">
                  <span class="input-group-text bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#764A34"
                      class="bi bi-gear-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                  </span>
                </span>
                <input
                  class="form-control border-left-0"
                  type="text"
                  id="userCode"
                  placeholder="Enter Code"
                />
              </div>
              <br />
              {/* verify code btn  */}
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-block"
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                  onClick={() => verifyCode()}
                >
                  Verify Code
                </button>
              <br/>
                <button
                  type="button"
                  class="btn btn-block"
                  hidden={resendEmailBtn}
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setStageOneStatus(false);
                    setStageTwoStatus(true);
                    setStageThreeStatus(true);
                  }}
                >
                  Resend Email
                </button>
              </div>
            </div>

            {/* stage 3 */}
            <div hidden={stageThreeStatus}>
              <div className="text-center" hidden={passwordMatchDiv}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#279B14"
                  class="bi bi-check-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p style={{ color: "#279B14" }}>
                  <b>Password Match</b>
                </p>
              </div>
              <div className="text-center" hidden={passwordMisMatchDiv}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#D0193A"
                  class="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
                <p style={{ color: "#D0193A" }}>
                  <b>Password MisMatch</b>
                </p>
              </div>

              <form onSubmit={changePassword}>
                <div class="input-group">
                  {" "}
                  <span class="input-group-append bg-white border-right-10">
                    <span class="input-group-text bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#764A34"
                        class="bi bi-lock-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                      </svg>
                    </span>
                  </span>
                  <input
                    class="form-control border-left-0 border-right-0"
                    type={passwordShown ? "text" : "password"}
                    id="newPassword"
                    placeholder="Create New Password"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChange={(e) => {
                      setPasswordValidity({
                        minChar: e.target.value.length >= 8 ? true : false,
                        number: isNumberRegx.test(e.target.value)
                          ? true
                          : false,
                        specialChar: specialCharacterRegx.test(e.target.value)
                          ? true
                          : false,
                      });
                      if (
                        e.target.value.length >= 8 &&
                        isNumberRegx.test(e.target.value) &&
                        specialCharacterRegx.test(e.target.value)
                      ) {
                        if (hasWhiteSpace(e.target.value)) {
                          setChangePStatus(true);
                          setSpaceValidation(false);
                        } else {
                          setChangePStatus(false);
                          setSpaceValidation(true);
                        }
                        //setChangePStatus(false);
                      } else {
                        if (hasWhiteSpace(e.target.value)) {
                          setChangePStatus(true);
                          setSpaceValidation(false);
                        } else {
                          setChangePStatus(false);
                          setSpaceValidation(true);
                        }
                      }
                    }}
                    required
                  />
                  <span class="input-group-append bg-white border-left-0">
                    <span class="input-group-text bg-transparent">
                      <div hidden={eyeSlashIcon} style={{ color: "#764A34" }}>
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
                      <div hidden={eyeIcon} style={{ color: "#764A34" }}>
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
                {passwordFocused && (
                  <PasswordStrengthIndicator validity={passwordValidity} />
                )}

                <p style = {{color : "#D0193A"}} hidden = {spaceValidation}>Password Cannot contain Spaces</p>
                <br />
                <div class="input-group">
                  {" "}
                  <span class="input-group-append bg-white border-right-10">
                    <span class="input-group-text bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#764A34"
                        class="bi bi-lock-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                      </svg>
                    </span>
                  </span>
                  <input
                    class="form-control border-left-0 border-right-0"
                    type={CpasswordShown ? "text" : "password"}
                    id="confirmPassword"
                    required
                    onChange={(e) => {
                      if (document.getElementById("newPassword").value === "") {
                      } else if (
                        document.getElementById("newPassword").value != ""
                      ) {
                        if (
                          e.target.value ===
                          document.getElementById("newPassword").value
                        ) {
                          setChangePStatus(false);
                          setPasswordMisMatchDiv(true);
                          setPasswordMatchDiv(false);
                        } else {
                          setPasswordMisMatchDiv(false);
                          setPasswordMatchDiv(true);
                          setChangePStatus(true);
                        }
                      }
                    }}
                    placeholder="Confirm Password"
                  />
                  <span class="input-group-append bg-white border-left-0">
                    <span class="input-group-text bg-transparent">
                      <div hidden={CeyeSlashIcon} style={{ color: "#764A34" }}>
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
                      <div hidden={CeyeIcon} style={{ color: "#764A34" }}>
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

                <br />
                {/* verify code btn  */}
                <div class="text-center">
                  <button
                    disabled={changePStatus}
                    type="submit"
                    class="btn btn-block"
                    style={{
                      backgroundColor: "#764A34",
                      color: "#ffffff",
                      borderRadius: "8px",
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
