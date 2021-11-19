import React, { useState } from "react";
import axios from "axios";
import CoverTemplate from "./covercardtemplate";
import TopDownloadTemplate from "./topdownloadtemplate";

export default function AddStudent(props) {
  let [name, setName] = useState("");
  let [age, setAge] = useState("");
  let [gender, setGender] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newStudent = {
      name,
      age,
      gender,
    };

    console.log(newStudent);
    // axios
    //   .post("http://localhost:8070/student/add", newStudent)
    //   .then(() => {
    //     alert("Student Added");

    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    // alert("aas");
    // const { history } = props;
    // history.push("/");
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Student Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Student Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="row">
        <div className="col-md-3">
          <CoverTemplate />
        </div>
        <div className="col-md-3">
          <TopDownloadTemplate />
        </div>
      </div>
    </div>
  );
}

// export default AddStudent;