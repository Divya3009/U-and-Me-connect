import React from 'react'
import { Navbar } from 'react-bootstrap';
import "./Header.css";
function Header() {
    return (
        <>  
        <Navbar bg="black" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYsEQr1ItLBVVYYbOiZG-_wzS10PhO8LIU6w&usqp=CAU"
              width="40"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            U and Me connect
          </Navbar.Brand>
        </Navbar>
      </>
    )
}

export default Header;
