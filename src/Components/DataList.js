import React, { useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Button } from "react-bootstrap";
import axios from "axios";

const DataList = props => {
  const selectRowProp = {
    mode: "radio",
    clickToSelect: true, // enable click to select
    onSelect: onRowSelect
  };
  function onRowSelect(row, isSelected, e) {
    let temp = row.id;
    console.log(temp);
    props.handleSelectId(temp);
  }

  return (
    <BootstrapTable data={props.data} selectRow={selectRowProp}>
      <TableHeaderColumn dataField="id" isKey>
        Id
      </TableHeaderColumn>
      <TableHeaderColumn dataField="startTime">
        Rozpoczęcie wizyty
      </TableHeaderColumn>
      <TableHeaderColumn dataField="endTime">
        Zakończenie wizyty
      </TableHeaderColumn>
      <TableHeaderColumn dataField="type">Rodzaj</TableHeaderColumn>
    </BootstrapTable>
  );
};

export default DataList;
