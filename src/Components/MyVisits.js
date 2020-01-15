import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
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
  const [myVisits, setMyVisits] = useState(null);
  const cancelVisit = () => {
    axios.put(
      `https://localhost:44396/visit/cancel/${selectedVisitId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
    getMyVisits();
  };
  useEffect(() => getMyVisits(), []);
  const getMyVisits = () => {
    fetch("https://localhost:44396/visit/user-visits", {
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

  return (
    <div>
      {console.log(props.token)}
      <h1> Moje wizyty</h1>
      <DataList data={myVisits} handleSelectId={setSelectedVisitId} />
      <Button variant="primary" type="submit" onClick={cancelVisit}>
        Odwołaj
      </Button>
    </div>
  );
};

export default MyVisits;
