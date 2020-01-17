import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginAdmin = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);
  let history = useHistory();

  const handleLogin = () => {
    let statusCode = "";
    axios
      .post("https://localhost:44396/user/authenticate", {
        username: username,
        password: password
      })
      .then(response => {
        props.onTokenChange(response.data.token);
        if (response.data.token != "") {
          setIsSuccessLogin(true);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("isLogged", "true");
        }
      });
    history.push("/admin");
  };
  const getMyVisits = () => {
    fetch("https://localhost:44396/visit/userVisits", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        const temp = res;
        props.setMyData(temp);
        console.log(temp);
      });
  };

  // const alertPop = () => {
  //   if (isSuccessAlert) {
  //     return <Alert variant="success">Zalogowano pomyślnie!</Alert>;
  //   } else {
  //     return <Alert variant="danger">Logowanie nie udane</Alert>;
  //   }
  // };

  const handleRedirect = () => {
    history.push("/register");
  };

  return (
    <div style={{ width: 300, marginTop: 20, marginLeft: 20 }}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Login"
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Hasło"
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Text className="text-muted" onClick={handleRedirect}>
          Nie masz konta? Zarejestruj się <b>tutaj</b>!
        </Form.Text>
      </Form>
      <Button variant="primary" type="submit" onClick={handleLogin}>
        Zaloguj
      </Button>
    </div>
  );
};

export default LoginAdmin;
