import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import DataList from "./DataList";
import axios from "axios";

const Visits = props => {
  const reserveVisit = id => {
    console.log(id);
    axios.put(
      `https://localhost:44396/visit/reserve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      }
    );
  };

  const visits = props.data.map((visit, index) => (
    <div class="col-xl " style={{ textAlign: "center" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{visit.type}</Card.Title>
          <Card.Text>
            <p>
              Termin: {moment(visit.startTime).format("MM-DD-YY HH:mm ")} -{" "}
              {moment(visit.endTime).format("HH:mm")}
            </p>
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              reserveVisit(visit.id);
            }}
          >
            Zarezerwuj
          </Button>
        </Card.Body>
      </Card>
    </div>
  ));
  return (
    <div class="container">
      <h1>Dostępne wizyty</h1>
      {visits}
    </div>
  );
};

export default Visits;
