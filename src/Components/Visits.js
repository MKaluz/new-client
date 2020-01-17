import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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
    <div style={{ textAlign: "center" }}>
      <div>
        <div>
          <div>{visit.type}</div>
          <div>
            <p>
              Termin: {moment(visit.startTime).format("MM-DD-YY HH:mm ")} -{" "}
              {moment(visit.endTime).format("HH:mm")}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              reserveVisit(visit.id);
            }}
          >
            Zarezerwuj
          </Button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container visits-header">
      <h1>Dostępne wizyty</h1>
      <div className="visits">{visits}</div>
    </div>
  );
};

export default Visits;
