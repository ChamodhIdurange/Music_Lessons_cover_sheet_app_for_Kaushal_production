import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import k from "../../images/lm.png";



export default function Home(props) {

  let [Top4Downloads, setTop4Downloads] = useState([]);

  useEffect(async () => {
   

    function test(){

      axios.get("http://localhost:8070/covers/getcovers").then((res)=> {

          getTop4Downloads(res.data);

      }).catch((err)=> {
          console.log(err);
      })
  }
  test();

    }, []);

    

    function getTop4Downloads(data){

      let count =0;
      let currentmaxArray = [];
      let remainingArray = [];
      let tempArray=[];
      let tempArray2=[];
      let LastArray = []


      let initialArray = data;

      for(let i = 0 ; i < data.length; i++){

        
          let max = initialArray.reduce((max, b) => Math.max(max, b.NoOfDownloads), initialArray[0].NoOfDownloads);
          

          tempArray = initialArray.filter((item) => item.NoOfDownloads === String(max));

   
          for(let p = 0 ; p < tempArray.length; p++){

              currentmaxArray.push(tempArray[p]);
          }

          count = currentmaxArray.length;
    
          if(count >= 4){
              break;
          }

          tempArray2 = initialArray.filter((item) => item.NoOfDownloads !== String(max));


         
          for(let q = 0 ;q < tempArray2.length ; q++ ){
              remainingArray.push(tempArray2[q]);
          }

          initialArray = remainingArray;
          remainingArray = [];
 
      }
      
      for(let l = 0 ; l < 4 ; l++){

          LastArray.push(currentmaxArray[l]);


      }


      setTop4Downloads(LastArray);
  }

  async function displayImages(coverImageName, index) {
    // if (recommenedCovers.length != 0) {
      const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
      await getDownloadURL(storageRef)
        .then((url) => {
          document.getElementById(index).src = url;
        })
        .catch((err) => {

          // ErrorhandlingTxt("Reccomended covers are not available right now!")
        });
    // }
  }

return(

    <div className="home" style={{overflowX:"hidden"}}>

        <img src = {'/images/hm.jpeg'} class="img-fluid" alt="Cover Image" style={{borderRadius:"0px" , width:"100%"}}/> <br/><br/>
        
        <h1 style={{color:"#764A34", textAlign:"center", fontWeight:"bold"}}>Discover them now!</h1><br/>

        <div>

        <h2 style={{fontWeight:"bold", paddingLeft:"30px"}}>Our Top Downloads-</h2><br/>
       
    <div class="card-deck" style={{paddingRight:"50px", paddingLeft:"50px"}}>
  
        {/* <div class="card" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px", borderRadius:"15px"}}>
            <img src={'/images/cover.jpg'} class="card-img-top" alt="..."  style={{borderRadius:"15px 15px 0px 0px"}}/>
                <div class="card-body">
                    <h4 class="card-title" style={{fontWeight:"bold"}}>Dance Monkey</h4>
                    <h5>By Toni Elizabeth Watson</h5>
                </div>
        </div> */}

{Top4Downloads.map((covers, index) => (
             <div

             class="card"
             style={{
               boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
               borderRadius: "15px",
               marginRight: "15px",
               marginLeft: "15px",
             }}
           >

             
             <img

             id={index}
             src={
               displayImages(covers.PreviewPages[0], index) ||
               "/images/imageplaceholder.png"
             }
               
               class="card-img-top"
               alt="..."
               style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
             />
             <div class="card-body">
               <h4 class="card-title" style={{ fontWeight: "bold" }}>
                 {covers.Title}
               </h4>
               <h5>{covers.OriginalArtistName}</h5>
               <h5>{covers.MainCategory}</h5>
               <h5>{covers.SubCategory}</h5>
               <h3 style={{ float: "right", color: "#764A34" }}>
                 <b>US$ {covers.Price}</b>
               </h3>
             </div>
           </div>

))}

        </div>

    
    </div>

<br/><br/>

<section class="about_section layout_padding">
    <div class="container  ">

      <div class="row">
        <div class="col-md-6 ">
          <div class="img-box">
            <img src="https://images.unsplash.com/photo-1541690212779-7a48c04096cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt=""/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h2>
                We Are Feane
              </h2>
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
              the middle of text. All
            </p>
           
          </div>
        </div>
      </div>
    </div>
  </section>


<br/><br/>

        <h1 style={{color:"#764A34", textAlign:"center", fontWeight:"bold"}}>LISTEN TO WHAT I HAVE DONE SO FAR ...</h1><br/>

        <h2 style={{fontWeight:"bold", paddingLeft:"30px"}}>Discover Classical Guitar Covers-</h2><br/>


    <div class="row" style={{paddingLeft:"50px", paddingRight:"50px"}}>
       
        <div class="col-sm">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/aTgXgN9fOsk"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>
            </div>
            <br/>
        </div>


        <div class="col">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/hXQxSi34GWY"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>

            </div>
        </div>

        {/* <div class="col-sm">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/-dZ53Ffs0Gc"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>

            </div>
        </div> */}

    </div>
  
  <br/><br/>
  
        <h2 style={{fontWeight:"bold", paddingLeft:"30px"}}>Discover Technics & Lessons-</h2><br/>

    <div class="row" style={{paddingLeft:"50px", paddingRight:"50px"}}>
    
        <div class="col-sm">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/JWSSS7tJ2wQ"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
            <br/>
        </div>

        <div class="col">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/nYWzZ7BM8pA"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </div>

        {/* <div class="col-sm">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/M-9O9RNLskw"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>
            </div>
        </div> */}
    
    </div>

<div class="features" style={{backgroundColor:"white"}}>
		<div class="container">
			<div class="row">
				<div class="col text-center">

					<div class="section_title">
          <h1 style={{color:'#764A34', textAlign:"center", fontWeight:"bold"}}>Our Services</h1>
					</div>

				</div>
			</div>
			<div class="row features_row">

				<div class="col-lg-4 text-lg-right features_col order-lg-1 order-2">
					
				
					<div class="features_item">
						<h2>Responsive</h2>
						<p>Etiam nec odio vestibulum est mattis effic iturut magna. Pel lentesque sit am et tellus.</p>
					</div>

				
					<div class="features_item">
						<h2>Clean code</h2>
						<p>Nec odio vestibulum est mattis effic iturut magna. Pel lentesque sit am et tellus bla ndit.</p>
					</div>

				</div>
        <div class="col-lg-4 d-flex flex-column align-items-center order-lg-2 order-1">
					<div class="features_image">
						<img src={k} alt=""/>
					</div>
				</div>

        <div class="col-lg-4 features_col order-lg-3 order-3">
					
				
					<div class="features_item">
						<h2>Retina ready</h2>
						<p>Nec odio vestibulum est mattis effic iturut magna. Pel lentesque sit am et tellus bla ndit.</p>
					</div>

			
					<div class="features_item">
						<h2>Great team</h2>
						<p>Etiam nec odio vestibulum est mattis effic iturut magna. Pel lentesque sit am et tellus.</p>
					</div>

					

				</div>
			</div>
		</div>
	</div>




</div>




    )
}