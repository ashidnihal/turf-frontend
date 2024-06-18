import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TurfCard from '../Components/TurfCard';
import { Link } from 'react-router-dom';
import { FormControl, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { allTurfAPI } from '../Services/allAPIs';

function UserDashboard({ setShowHeader }) {
  const [openNavRight, setOpenNavRight] = useState(false);
  const [SearchKey, setSearchKey] = useState("");
  const [allUserTurf, setallUserTurf] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(sessionStorage.getItem('username')); // Set username when component mounts
    setShowHeader(false); // Hide the header when the component mounts
    return () => {
      setShowHeader(true); // Show the header when the component unmounts
    };
  }, []);

  const allTurf = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      const result = await allTurfAPI(SearchKey, reqHeader);
      if (result.status === 200) {
        setallUserTurf(result.data);
      } else {
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    allTurf();
  }, [SearchKey]); // Call allTurf function when SearchKey changes

  return (
    <div>
      <div className=' text-center bg-image' style={{ 
        backgroundImage: "url('https://img.freepik.com/free-vector/top-view-realistic-soccer-pitch-corner_107791-20447.jpg?t=st=1716179848~exp=1716183448~hmac=f05ae3e3a9cdfdddec082ccef0c00ddc9f254e951032e9798228ca77d7cdac51&w=1380')",
        height: '350px'
      }}>
        <header>
          <Navbar expand='lg' bg='transparent' variant='light'>
            <Container fluid>
              <Navbar.Toggle aria-controls='navbarRightAlignExample' aria-expanded={openNavRight} onClick={() => setOpenNavRight(!openNavRight)} />
              <Navbar.Collapse id='navbarRightAlignExample' className='justify-content-end'>
                <Nav className='mb-2 mb-lg-0 me-5'>
                  <Link to={'/partner-with-us'} className="nav-link text-light me-5 fs-5 fw-bold">Add Turf</Link>
                  <NavDropdown className='fs-5 me-5' title={<span style={{ color: 'white', fontWeight: 'bold' }}>{userName}</span>} id='nav-dropdown'>
                    <NavDropdown.Item  ><button className='btn btn-danger ms-3'>Logout</button></NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='text-white'>
            <h1 className='mb-3' style={{ fontSize: '70px' }}>TurfEase</h1>
            <h4 className='mb-3' style={{ fontSize: '40px' }}>Your gateway to hassle-free turf bookings!</h4>
          </div>
        </div>
      </div>
      <div className='col-8 mx-auto'>
        <h3 className='text-center mt-5'>Experience the joy of playing with your friends at the best turfs in town</h3>
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="basic-addon1">
            <BsSearch />
          </InputGroup.Text>
          <FormControl onChange={e => setSearchKey(e.target.value)} placeholder="Search…" aria-label="Search" aria-describedby="basic-addon1" />
        </InputGroup>
      </div>
      {allUserTurf.length > 0 ? allUserTurf.map(item => (<TurfCard turf={item} />)) : "No such turf"}
    </div>
  );
}

export default UserDashboard;
