import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { bookTurfAPI } from '../Services/allAPIs';
import { serverURL } from '../Services/serverURL';
import StripeCheckout from 'react-stripe-checkout';

function TurfCard({ turf }) {
  const [show, setShow] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  useEffect(() => {
    if (show) {
      fetchBookedSlots();
    }
  }, [show, date]);

  const fetchBookedSlots = async () => {
    try {
      const response = await axios.get(`${serverURL}/turf/bookedslots`, {
        params: { turfId: turf._id, date },
      });
      setBookedSlots(response.data);
      console.log('bookedSlots :', response.data);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot) ? prevSlots.filter(s => s !== slot) : [...prevSlots, slot]
    );
  };

  const onToken = async (token) => {
    const totalAmount = turf.hourlyPrice * selectedSlots.length;
    const reqBody = {
      turfId: turf._id,
      bookedTimeRanges: selectedSlots,
      date: date,
      amount: totalAmount,
      token: token
    };
    const reqHeader = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    };

    try {
      const response = await bookTurfAPI(reqBody, reqHeader);
      if (response.status === 201) {
        alert('Booking and payment successful!');
        handleClose();
      } else {
        alert(response.response.data.message);
        console.log(response.response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to book turf');
    }
  };

  const totalAmount = turf.hourlyPrice * selectedSlots.length;

  return (
    <div className="container my-5">
      <MDBCard className='w-75 mx-auto'>
        <MDBCardBody>
          <div className="row">
            <div className="col-md-6">
              <MDBCardImage
                src={turf ? `${serverURL}/uploads/${turf.turfImage}` : "https://img.freepik.com/free-photo/boy-soccer-player-sitting-green-grass_155003-13809.jpg?t=st=1715494127~exp=1715497727~hmac=c010b7de405faa233dee47629d02f985f300fbd72434d01c9e2b8cceae977ebf&w=996"}
                alt="Turf Image"
                className="w-100"
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <MDBCardTitle>Name: {turf.turfName}</MDBCardTitle>
              <MDBCardText>Location: {turf.location}</MDBCardText>
              <MDBCardText>Mobile: {turf.turfMobile}</MDBCardText>
              <MDBCardText>Price: {turf.hourlyPrice}</MDBCardText>
              <MDBBtn onClick={handleShow}>Book</MDBBtn>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Turf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <img
                src={turf ? `${serverURL}/uploads/${turf.turfImage}` : "https://img.freepik.com/free-photo/boy-soccer-player-sitting-green-grass_155003-13809.jpg?t=st=1715494127~exp=1715497727~hmac=c010b7de405faa233dee47629d02f985f300fbd72434d01c9e2b8cceae977ebf&w=996"}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="col-6">
              <h2>Turf Details</h2>
              <p><strong>Turf Name:</strong> {turf.turfName}</p>
              <p><strong>Owner Name:</strong> {turf.ownerName}</p>
              <p><strong>Phone Number:</strong> {turf.turfMobile}</p>
              <p><strong>Price:</strong></p>
              <ul>
                <li><strong>Hourly:</strong> ₹{turf.hourlyPrice} per hour</li>
                <li><strong>Daily:</strong> ₹{turf.dailyPrice} per day</li>
                <li><strong>Monthly:</strong> ₹{turf.monthlyPrice} per month</li>
              </ul>
              <p><strong>Location:</strong> {turf.location}</p>
            </div>
          </div>
          
          <div className="col-12">
            <h3 className='mt-3'>Available Slots</h3>
            <input type="date" value={date} onChange={handleDateChange} className="form-control mb-3" />

            <div className="btn-group-horizontal" role="group" aria-label="Time Slots">
              {turf.selectedTimeSlots.map((timeSlotString, index) => {
                let timeSlots;
                try {
                  timeSlots = JSON.parse(timeSlotString);
                } catch (error) {
                  console.error('Invalid JSON:', timeSlotString, error);
                  return null; // Skip rendering this slot if the JSON is invalid
                }
                return (
                  <div key={index} className="mb-3">
                    <h5>Time Slot {index + 1}</h5>
                    {timeSlots.map((time, idx) => {
                      const isBooked = bookedSlots.some(slot => slot.bookedTimeRanges.includes(time));
                      console.log('Time:', time);
                      console.log('Is Booked:', isBooked);
                      console.log('Selected Slots:', selectedSlots);
                      console.log(bookedSlots);
                      return (
                        <button
                          key={idx}
                          className={`btn ${selectedSlots.includes(time) ? 'btn-success' : isBooked ? 'btn-outline-danger' : 'btn-outline-success'} m-2 px-3`}
                          onClick={() => handleSlotSelection(time)}
                          disabled={isBooked}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <h4>Total Amount: ₹{totalAmount}</h4>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <StripeCheckout
            amount={totalAmount * 100}
            currency='inr'
            token={onToken}
            stripeKey="pk_test_51PJGohSBy7O37l9MmojKWKKkmAUKqDJ8VKxfKkV9RQWFaUXmMp3giAQJvIjvnKr7VuV3waqOMwfxrSASDjzKhrlh00PGDb6nPK"
          >
            <Button className='btn btn-primary'>
              Pay with Card
            </Button>
          </StripeCheckout>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TurfCard;
