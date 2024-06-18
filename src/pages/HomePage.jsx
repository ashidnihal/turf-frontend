import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

function HomePage() {
  return (
    <>
      <div
        className='p-5 text-center bg-image'
        style={{ 
          backgroundImage: "url('https://www.fcbarcelona.com/photo-resources/2024/01/22/b886768c-f0b4-4bc4-b9f3-435bcfada249/mini__GP21739.jpg?width=1200&height=750')",
          height: '450px'
        }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Welcome to TurfEase</h1>
              <h4 className='mb-3'>Your premier destination for hassle-free turf bookings</h4>
              <MDBBtn tag="a" outline size="lg" color="light"> {/* Use color="light" to set button color to light */}
                Join Our Club
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
          
      <div className="row mt-5 mb-5">
  <div className="col-md-4 mb-4">
    <div className='text-center'>
      <img src="https://img.freepik.com/free-vector/location_53876-25530.jpg?t=st=1714731579~exp=1714735179~hmac=35a0cf27c880fa7914c73eb4bcab8b0e8e0ce89829f693035b6bc73bbf6f6cd7&w=740" width={70} alt="" srcset="" />
      <p className='fs-5'>Search</p>
      <p>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities</p>
    </div>
  </div>
  <div className="col-md-4 mb-4">
    <div className='text-center'>
      <img src="https://img.freepik.com/free-vector/schedule-calendar-flat-style_78370-1550.jpg?t=st=1714731790~exp=1714735390~hmac=7d307e2ab69e40aa6fbba5f1fb2d1e53c7356158451cd6f9c655416bd7d4905f&w=740" width={60} alt="" srcset="" />
      <p className='fs-5'>Book</p>
      <p>Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment</p>
    </div>
  </div>
  <div className="col-md-4 mb-4">
    <div className='text-center'>
      <img src="https://img.freepik.com/free-vector/vector-isolated-realistic-soccer-ball-white_1284-41932.jpg?t=st=1714731934~exp=1714735534~hmac=b31b2f6196f1fc15136b0fd4f78a1549ab47a1c49c64e277fce274cae99e880c&w=740" width={70} alt="" srcset="" />
      <p className='fs-5'>Play</p>
      <p>You’re the hero, you’ve found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.</p>
    </div>
  </div>
</div>
</div>

{/* <div style={{backgroundImage: "url('https://about.fb.com/wp-content/uploads/2022/10/Show-Your-Spirit-With-Liverpool-FC-Kits-in-the-Meta-Avatars-Store_Header.jpg?w=1920')", height: '400px',backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}>
  <h3 className="text-end text-danger mt-5">
    Immerse yourself in the joy of playing with friends<br/> against a backdrop of thrilling football action.
  </h3>
</div> */}
<div className="container">
<div className="row flex-column flex-md-row mb-5">
  <div className="col-md-6">
    <img 
      src="https://about.fb.com/wp-content/uploads/2022/10/Show-Your-Spirit-With-Liverpool-FC-Kits-in-the-Meta-Avatars-Store_Header.jpg?w=1920" 
      alt=""
      style={{ width: '100%', height: '100%' }} // Set width and height to 100%
    />
  </div>
  <div className="col-md-6 d-flex justify-content-center align-items-center">
    <h2 className="text-center text-danger mt-5">
      Immerse yourself in the joy of playing with friends<br/> against a backdrop of thrilling football action
    </h2>
  </div>
</div>
</div>



    </>
  );
}

export default HomePage;
