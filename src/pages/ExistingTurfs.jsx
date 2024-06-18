import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userTurfAPI } from '../Services/allAPIs';
import TurfCard from '../Components/TurfCard';

function ExistingTurfs({ setShowHeader }) {
  const [openNavRight, setOpenNavRight] = useState(false);
  const [searchKey,setSearchKey] =useState("")
  const [userName, setUserName] = useState("");

  const[userTurf,setuserTurf]=useState('')
  useEffect(() => {
    setUserName(sessionStorage.getItem('username'));
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, []);
  const getuserTurf=async()=>{
      if(sessionStorage.getItem('token')){
        const token=sessionStorage.getItem('token')
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ token
        }
      
      const result=await userTurfAPI(searchKey,reqHeader)
      console.log(result);
      setuserTurf(result.data)
     }
      
    }
    console.log(userTurf);


  useEffect(() => {
    getuserTurf()
 
  }, [searchKey]);

  return (
    <div>
      <div className='text-center bg-image' style={{ 
        backgroundImage: "url('https://img.freepik.com/free-photo/soccer-player-action-stadium_1150-14606.jpg?t=st=1716180112~exp=1716183712~hmac=1a9c223e207be744c0a5f9961fbd99da7262df872bf0607d674785f76101e6ca&w=996')",
        height: '550px'
      }}>
        <header>
          <Navbar expand='lg' bg='transparent' variant='light'>
            <Container fluid>
              <Navbar.Brand className='text-light fs-5' style={{fontWeight: 'bold'}}>TurfEase business</Navbar.Brand>
              <Navbar.Toggle
                aria-controls='navbarRightAlignExample'
                aria-expanded={openNavRight}
                onClick={() => setOpenNavRight(!openNavRight)}
              />
              <Navbar.Collapse id='navbarRightAlignExample' className='justify-content-end'>
                <Nav className='mb-2 mb-lg-0 me-5'>
                  <Nav.Item>
                    <NavDropdown className='me-5 fs-5' title={<span style={{ color: 'white',fontWeight: 'bold' }}>{userName}</span>} id='nav-dropdown'>
                      <NavDropdown.Item><button className='btn btn-danger ms-3'>Logout</button></NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='text-white'>
            <h4 className='mb-3 ' style={{fontSize:'40px'}}>Find your turfs on TurfEase</h4>
            <h4 className='mb-5' style={{fontSize:'20px'}}>Check if your turf page already exists on TurfEase</h4>
          </div>
        </div>
       
      </div>
      <div className='col-8 mx-auto' >
          <InputGroup className="mb-3 mt-5">
            <InputGroup.Text id="basic-addon1">
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search…"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchKey} 
              onChange={e => setSearchKey(e.target.value)} 
            />
          </InputGroup>
        </div>
        {userTurf.length > 0 ? (
  userTurf.map(item => <TurfCard turf={item} />)
) : (
  <div className="text-center  m-5">
    <h1>No turfs added yet <img src="https://cdn-icons-png.freepik.com/512/166/166527.png" alt="" srcset="" width={50} /></h1>
  </div>
)}
    </div>
  );
}

export default ExistingTurfs;
