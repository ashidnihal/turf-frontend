
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { Container} from 'react-bootstrap';
import { MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { adminAllTurfAPI, deleteTurfAPI } from '../Services/allAPIs';
import { serverURL } from '../Services/serverURL';
// import { FormControl, InputGroup } from 'react-bootstrap';
// import { BsSearch } from 'react-icons/bs';
import Swal from 'sweetalert2';

function AdminTurf({setShowHeader}) {
    const [searchKey,setSearchKey] =useState("")
    console.log(searchKey);
    const[adminTurf,setAdminTurf] =useState([]);
    const getadminturf=async()=>{
        if(sessionStorage.getItem('token')){
            const token=sessionStorage.getItem('token')
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ token  
            }
            const result=await adminAllTurfAPI(searchKey,reqHeader)
            console.log(result.data);
            setAdminTurf(result.data)
        }


    }
    const handleDelete = async (turfId) => {
      console.log(turfId);
      try {
        if (sessionStorage.getItem('token')) {
          const token = sessionStorage.getItem('token');
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          };
          const result=await deleteTurfAPI(turfId, reqHeader);
          console.log(result);
          Swal.fire('Deleted!', 'Booking has been deleted.', 'success');
          getadminturf(); // Refresh the list after deletion
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        Swal.fire('Error!', 'Failed to delete booking.', 'error');
      }
    };

    useEffect(() => {
        getadminturf()
        setShowHeader(false);
        return () => {
          setShowHeader(true);
        };
      }, [setShowHeader, searchKey]);
  return (
      <div className="container-fluid admin-dashboard">
    <div className="row">
      <nav className="col-md-2 d-none d-md-block  sidebar" style={{backgroundColor:'#f1f2f7',height:'650px'}}>
        <div className="sidebar-sticky" >
          <h3 className="sidebar-header m-5">TurfEase</h3>
          <ul className="nav flex-column sidebar-menu">
            <li className="nav-item">
              <Link className="nav-link rounded"   to="/admin">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link rounded"  to="/admin/user">Manage Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/booking">Manage Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{backgroundColor:'#e4e7f5'}} to="/admin/turfs">Manage Turfs </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/customer-review">View Statistics</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/admin/payment">Payment</Link>
            </li>
          
          
          </ul>

         
        </div>
      </nav>

      <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <input className="form-control form-control-dark w-50" onChange={e => setSearchKey(e.target.value)} type="text" placeholder="Search..." aria-label="Search" />
          <div className="user-info mb-2">
            <span className="username me-5">Delicious Burger</span>
            {/* <div> */}
              <button className='btn ' style={{backgroundColor:'#f1f2f7'}}><CiLogout className='fs-3 me-4' /> logout</button>
          {/* </div> */}
          </div>
        </div>
        <h1 className='mt-5'>Manage Turfs</h1>
    <p>Welcome to the user management interface. Take control of user accounts and maintain user data effortlessly</p>
  
   <Container>
    <MDBTable>
    <MDBTableHead dark>
  <tr>
    <th scope='col'>#</th>
    <th scope='col'>Turf Name</th>
    <th scope='col'>Image</th>
    <th scope='col'>Location</th>
    <th scope='col'>Owner Name</th>
    <th scope='col'>Mobile</th>
    <th scope='col'>Price</th>
    <th scope='col'>Actions</th>

  </tr>
</MDBTableHead>
<MDBTableBody>
{adminTurf.map((turf, index) => (
          <tr key={turf.id}>
            <th scope='row'>{index + 1}</th>
            <td>{turf.turfName}</td>
            <td><img src={ `${serverURL}/uploads/${turf.turfImage}`} alt={turf.turfName} style={{ width: '70px' }} /></td>
            <td>{turf.location}</td>
            <td>{turf.ownerName}</td>
            <td>{turf.ownerMobile}</td>
            <td>
              <div><strong>Hourly:</strong> ₹{turf.hourlyPrice}</div>
              <div><strong>Daily:</strong> ₹{turf.dailyPrice}</div>
              <div><strong>Monthly:</strong> ₹{turf.monthlyPrice}</div>
            </td>
            <td>
              <MDBIcon fas icon="trash" onClick={() => handleDelete(turf._id)} />
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
};

export default AdminTurf