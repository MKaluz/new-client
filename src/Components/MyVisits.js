import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import moment from "moment";
import DataList from "./DataList";
import { Button } from "react-bootstrap";
import axios from "axios";
const visit = {
  id: 2,
  startTime: "2019-11-28T17:35:00",
  endTime: "2019-11-28T18:00:00",
  type: "diagnostyczna"
};

const MyVisits = props => {
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [myVisits, setMyVisits] = useState([]);
  const cancelVisit = id => {
    axios.put(
      `https://localhost:44396/visit/cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
    getMyVisits();
  };
  useEffect(() => getMyVisits());
  const getMyVisits = () => {
    fetch("https://localhost:44396/visit/userVisits", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        const temp = res;
        setMyVisits(temp);
        console.log(myVisits + "state");
        console.log(res + " res");
      });
  };
  const visits = myVisits.map(visit => (
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
              cancelVisit(visit.id);
            }}
          >
            Odwołaj
          </Button>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      {console.log(props.token)}
      <h1> Moje wizyty</h1>
      <div>{visits}</div>
      <DataList data={props.data} handleSelectId={setSelectedVisitId} />
      <Button variant="primary" type="submit" onClick={cancelVisit}>
        Odwołaj
      </Button>
    </div>
  );
};

export default MyVisits;
