import React from "react";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import Login from "../Login";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/visits">Gabinet Lekarski</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Wizyty" id="basic-nav-dropdown">
            <NavDropdown.Item href="/visits">Wszystkie</NavDropdown.Item>
            <NavDropdown.Item href="/my-visits">Moje</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/about">Informacje</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;
