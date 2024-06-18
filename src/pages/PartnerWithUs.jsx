
import React, { useEffect, useState } from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import TurfTimeSlotSelector from '../Components/TurfTimeSlotSelector';
import { addTurfApi } from '../Services/allAPIs';
function PartnerWithUs({ setShowHeader }) {
  const[token,setToken]=useState("")
  const [userName, setUserName] = useState("");

  const [openNavRight, setOpenNavRight] = useState(false);
  const [turfData, setTurfData] = useState({
    turfName: "",
    location: "",
    turfMobile: "",
    ownerName: "",
    ownerMobile: "",
    hourlyPrice: "",
    dailyPrice: "",
    monthlyPrice: "",
    acknowledgement: false,
    turfImage: "", // For storing the uploaded image file
    selectedTimeSlots: [],
  });
  console.log(turfData);
  const handleSelectedTimeSlots = (selectedSlots) => {
    setTurfData((prevTurfData) => ({ ...prevTurfData, selectedTimeSlots: selectedSlots }));
  };

  const addTurf = async () => {
    const { turfName, location, turfMobile, ownerName, ownerMobile, hourlyPrice, dailyPrice, monthlyPrice, acknowledgement, turfImage, selectedTimeSlots } = turfData;
    if (!turfName || !location || !turfMobile || !ownerName || !ownerMobile || !hourlyPrice || !dailyPrice || !monthlyPrice || !acknowledgement || !turfImage || !selectedTimeSlots.length) {
      alert("Please fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("turfName", turfName);
      reqBody.append("location", location);
      reqBody.append("turfMobile", turfMobile);
      reqBody.append("ownerName", ownerName);
      reqBody.append("ownerMobile", ownerMobile);
      reqBody.append("hourlyPrice", hourlyPrice);
      reqBody.append("dailyPrice", dailyPrice);
      reqBody.append("monthlyPrice", monthlyPrice);
      reqBody.append("acknowledgement", acknowledgement);
      reqBody.append("turfImage", turfImage);
      reqBody.append("selectedTimeSlots", JSON.stringify(selectedTimeSlots));
  
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };
  
      try {
        const result = await addTurfApi(reqBody, reqHeader);
        console.log(result);
        if (result.status === 201) {
          alert("Turf added successfully");
          setTurfData({
            turfName: "",
            location: "",
            turfMobile: "",
            ownerName: "",
            ownerMobile: "",
            hourlyPrice: "",
            dailyPrice: "",
            monthlyPrice: "",
            acknowledgement: false,
            turfImage: "", // Reset turfImage to clear the input field
            selectedTimeSlots: []
          });
        } else {
          alert(result.response.data.message);
        }
      } catch (error) {
        console.error("Error adding turf:", error);
        alert("An error occurred while adding turf. Please try again.");
      }
    }
  };
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  })
  console.log(token);
  
    useEffect(() => {
      setUserName(sessionStorage.getItem('username'));
        setShowHeader(false); // Hide the header when the component mounts
        return () => {
          setShowHeader(true); // Show the header when the component unmounts
        };
      }, []);

     
      
  return (
    <div >
    <div
    className=' text-center bg-image'
    style={{ 
      backgroundImage: "url('https://img.freepik.com/free-photo/football-composition-with-copyspace-yellow-card_23-2147827676.jpg?t=st=1716179070~exp=1716182670~hmac=454e2d3f2363657d5bf43698f7135c4820ee4b4b29ffd5e993a6a5df84f715dc&w=996')",
      height: '450px'
    }}
  >
     <header>
  <Navbar expand='lg' bg='transparent' variant='light'>
    <Container fluid>
    <Navbar.Brand  className='text-light fs-5' style={{fontWeight: 'bold'}}>TurfEase business</Navbar.Brand>
      <Navbar.Toggle
        aria-controls='navbarRightAlignExample'
        aria-expanded={openNavRight}
        onClick={() => setOpenNavRight(!openNavRight)}
        style={{ color: 'white' }}
      />
      <Navbar.Collapse id='navbarRightAlignExample' className='justify-content-end'>
        <Nav className='mb-2 mb-lg-0 me-5'>
          {/* <Nav.Item>
            <Nav.Link active aria-current='page' className='text-light me-5 fs-5 fw-bold' href='#'>
              Add Turf
            </Nav.Link>
          </Nav.Item> */}
          {/* <Nav.Item>
            <Nav.Link href='#' className='text-light'>Link</Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <NavDropdown className='me-5 fs-5' style={{ color: 'white' }} title={<span style={{ color: 'white',fontWeight: 'bold' }}>{userName}</span>} id='nav-dropdown'>
              <NavDropdown.Item ><button className='btn btn-danger ms-3'>Logout</button></NavDropdown.Item>
              {/* <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something else here</NavDropdown.Item> */}
            </NavDropdown>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link disabled href='#'>
              Disabled
            </Nav.Link>
          </Nav.Item> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>
{/* <div className='mask' > */}
      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='text-white'>
          <h1 className='mb-3'>Partner with TurfEase</h1>
          <h4 className='mb-3'>at 0% commission for the 1st month!</h4>
          <button className='btn btn-primary px-5' onClick={() => {
    const partnerElement = document.getElementById("partner");
    if (partnerElement) {
        partnerElement.scrollIntoView({ behavior: "smooth" });
    }
}}>
           Register your Turf
          </button>
          <button className='btn bg-light text-dark ms-3 px-4'><Link to='/existingTurf'>View your existing turf</Link></button>
</div>
      </div>
    {/* </div> */}
  </div>
      
<div className='m-5 col-8 mx-auto '>
  <h1 className='text-center'>Why should you partner with TurfEase?</h1>
  <p className='text-center text-secondary'>At TurfEase, we're committed to creating seamless experiences for our users and partners alike. By partnering with us, you'll gain access to a wide range of benefits that will help grow your business and reach more customers.</p>
</div>
<div className="container">
     
      <div className="content">
       
        <section>
          <h4>Benefits of Partnering with TurfEase:</h4>
          <ul>
            <li>Increased Visibility: Showcase your turf facilities to our large user base and attract more customers.</li>
            <li>Streamlined Booking Process: Our platform offers an easy-to-use booking system that simplifies the reservation process for both you and your customers.</li>
            <li>Marketing Support: Take advantage of our marketing initiatives to promote your turf facilities and drive more traffic to your business.</li>
            <li>Flexible Pricing Options: Set your own pricing and customize your offerings to suit your business needs.</li>
            <li>Dedicated Support: Receive dedicated support from our team to address any questions or concerns you may have.</li>
          </ul>
        </section>
        <section>
  <h4 id='partner'>How to Partner with TurfEase:</h4>
  <div className="partner-form container">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-10 col-12 border p-5 mb-5 mt-5">
        <div>
          <h5 className='mt-3'>Turf details</h5>
          <p>Name, address, and location</p>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,turfName:e.target.value})} id="turf-name" label="Turf Name" variant="outlined" fullWidth value={turfData.turfName}/>
          </div>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,location:e.target.value})} id="turf-address" label="Turf Address" variant="outlined" fullWidth value={turfData.location}/>
          </div>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,turfMobile:e.target.value})}
             value={turfData.turfMobile}
              id="turf-mobile"
              label="Mobile Number at Turf"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              }}
            />
             <Form.Group controlId="formFile" className="mb-3" >
        <Form.Label>Upload an image of your turf (JPEG, PNG, or JPG)</Form.Label>
        <Form.Control onChange={e => setTurfData({...turfData, turfImage: e.target.files[0]})} type="file"  />
      </Form.Group>
          </div>
          
          <h5 className='mt-5'>Turf owner details</h5>
          <p>These will be used for revenue-related communications</p>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,ownerName:e.target.value})} id="owner-name" label="Owner Name" variant="outlined" fullWidth value={turfData.ownerName} />
          </div>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,ownerMobile:e.target.value})}
            value={turfData.ownerMobile}
              id="owner-mobile"
              label="Owner Mobile Number"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              }}
            />
             <TurfTimeSlotSelector selectedSlots={turfData.selectedTimeSlots} onSelectedTimeSlotsChange={handleSelectedTimeSlots}/>
          </div>

          <h5 className='mt-3'>Price Details</h5>
          <p>Enter the pricing information for your turf facility</p>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,hourlyPrice:e.target.value})} id="hourly-price" label="Hourly Price (in INR)" variant="outlined" type="number" fullWidth  value={turfData.hourlyPrice}/>
          </div>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,dailyPrice:e.target.value})} id="daily-price" label="Daily Price (in INR)" variant="outlined" type="number" fullWidth  value={turfData.dailyPrice}/>
          </div>
          <div className="mb-3">
            <TextField onChange={e=>setTurfData({...turfData,monthlyPrice:e.target.value})} id="monthly-price" label="Monthly Price (in INR)" variant="outlined" type="number" fullWidth  value={turfData.monthlyPrice}/>
          </div>

          <FormControlLabel
            control={<Checkbox checked={turfData.acknowledgement} onChange={(e) => setTurfData({ ...turfData, acknowledgement: e.target.checked })} name="acknowledgement" />}
            label="I acknowledge that the information provided is accurate."
          />

          <div className="text-center">
            <Button variant="contained" onClick={addTurf} color="primary">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



        <p>If you have any questions or would like more information about partnering with TurfEase, please feel free to contact us at <a href="mailto:partners@turfease.com">partners@turfease.com</a>.</p>
      </div>
    </div>
</div>

  )
}

export default PartnerWithUs
