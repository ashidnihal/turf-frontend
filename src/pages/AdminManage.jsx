import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { Container } from 'react-bootstrap';
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { adminBookinngAPI, deleteBookingAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2';

function AdminManage({ setShowHeader }) {
  const [searchKey, setSearchKey] = useState('');
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  const fetchBookingDetails = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      const result = await adminBookinngAPI(searchKey, reqHeader);
      setBookData(result.data);
      console.log(result.data);
    }
  };

  const handleDelete = async (bookingId) => {
    console.log(bookingId);
    try {
      if (sessionStorage.getItem('token')) {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        };
        const result=await deleteBookingAPI(bookingId, reqHeader);
        console.log(result);
        Swal.fire('Deleted!', 'Booking has been deleted.', 'success');
        fetchBookingDetails(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      Swal.fire('Error!', 'Failed to delete booking.', 'error');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    fetchBookingDetails();
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader, searchKey]);

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#f1f2f7', height: '650px' }}>
          <div className="sidebar-sticky">
            <h3 className="sidebar-header m-5">TurfEase</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link rounded" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ backgroundColor: '#e4e7f5' }} to="/admin/booking">Manage Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/turfs">Manage Turfs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/payment">Payment</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <input
              className="form-control form-control-dark w-50"
              type="text"
              placeholder="Search..."
              aria-label="Search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <div className="user-info mb-2">
              <span className="username me-5">Delicious Burger</span>
              <button className='btn' style={{ backgroundColor: '#f1f2f7' }} onClick={handleLogout}>
                <CiLogout className='fs-3 me-4' /> logout
              </button>
            </div>
          </div>
          <h1 className='mt-5'>Manage Booking</h1>
          <p>Welcome to the booking management section. Take charge of reservations, organize schedules, and ensure seamless coordination.</p>
          <Container>
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Turf ID</th>
                  <th scope='col'>User ID</th>
                  <th scope='col'>Booked Time Ranges</th>
                  <th scope='col'>Confirmed</th>
                  <th scope='col'>Booked At</th>
                  <th scope='col'>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {bookData.map((booking, index) => (
                  <tr key={booking._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{booking.turfId ? booking.turfId.turfName : ''}</td>
                    <td>{booking.userId ? booking.userId.username : ''}</td>
                    <td>{booking.bookedTimeRanges.join(', ')}</td>
                    <td>{booking.isVerified ? 'Yes' : 'No'}</td>
                    <td>{new Date(booking.createdAt).toLocaleString()}</td>
                    <td>
                      <MDBIcon fas icon="trash" onClick={() => handleDelete(booking._id)} />
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default AdminManage;
