import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net";
import $ from "jquery";

export default function AdminVwCustomer(props) {

const [customers, setCustomers]=useState([]);
const [length, setLength]=useState([]);
const [loged, setLoged]=useState([]);
// let [customers, setCustomers]=useState("");
let customer =[];

useEffect(()=>{
    function getCustomers(){

        axios.get("http://localhost:8070/customer/getAll")
        .then((res)=>{
            console.log(res.data);
            setLength(res.data.length)

            // customer=res.data;
            // console.log(customer);
            // setCustomers(customer);

            setCustomers(res.data);
            console.log(customers);       
            
            const filter = res.data.filter(
              (cus) => cus.LoginStatus == true
            );
            console.log(filter.length)
              setLoged(filter.length)
            
$(document).ready(function () {
    $("#example").DataTable();
  });
        })  
        .catch((err) => {
            alert(err);
          });
       
    }
    getCustomers();

},[]);


  return (
 
    <div className="container">
      <br/>
      <br/>
        <div class="table-title">
        <div class="row text-right">
            <div class="col-7">
              <h2 style={{color:'#764A34'}}><b>Customer Details</b></h2>
            </div>
            <div className="col-5"><b>
                <span>No of Customers : {length}</span>
              <br/>
                <span>Online Customers : {loged}</span>
                </b>
            </div>
        </div>
    </div>
   
    
            <table class="table table-striped table-bordered text-center" id="example">
            <thead class="thead-dark">
        
                <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
                <th scope="col">Country</th>
                <th scope="col">Login Status</th>
                </tr>
               
            </thead>
            <tbody>
            {    console.log(customers)}
                {customers.map((cus)=>{
                    return(
                <tr>
                    {/* <th scope="row"></th> */}
                    <td>{cus.FirstName}</td>
                    <td>{cus.LastName}</td>
                    <td>{cus.Email}</td>
                    <td>{cus.ContactNumber}</td>
                    <td>{cus.Country}</td> 
                    {/*  */}
                    <td>{cus.LoginStatus}
                    {(() => {
                  if (cus.LoginStatus == true){
                    return (
                        <span class="text-success">Online &ensp;<i class="fas fa-circle"  style={{color:'#279B14'}}></i></span>
                    )}
                  return <span class="text-danger">Offline &ensp;<i class="fas fa-circle"  style={{color:'#D0193A '}}></i></span>
                  })()}
                  </td>
                </tr>
                    )
                 })}
            </tbody>
            </table>

</div>

  );
}



