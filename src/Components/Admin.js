import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Dropdown, InputGroup, FormControl } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import axios from "axios";

const Admin = props => {
  const [startDate, setStartDate] = useState(Date());
  const [endDate, setEndDate] = useState(Date());
  const [type, setType] = useState("");
  let history = useHistory();

  const onStartChange = date => setStartDate(date);
  const onEndChange = date => setEndDate(date);
  const onTypeClick = type => setType(type);
  const deleteVisit = id => {};

  const createVisit = id => {
    axios.post(
        'https://localhost:44396/visit',
        {
        "startTime": startDate,
        "endTime": endDate,
        "patient": 0,
        "type": type},
        {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        }
      );
    };
  };
  const visits = props.data.map(visit => (
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
          <Button variant="primary">Usuń</Button>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      Admin page
      <div>
        <div>
          <div>Rozpoczęcie:</div>
          <DateTimePicker onChange={onStartChange} value={startDate} />
        </div>
        <div>Zakończenie:</div>
        <DateTimePicker onChange={onEndChange} value={endDate} />
        <div>
          <div>{type}</div>

          <FormControl
            onChange={e => setType(e.target.value)}
            placeholder="Username"
            aria-label="Username"
          ></FormControl>
        </div>
        <Button>Dodaj</Button>
      </div>
    </div>
  );
};

export default Admin;
