import React, { Fragment, useState, useEffect } from "react";
import { getPersons, addPerson } from './api';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const DisplayPersonData = () => {

  const [personData, setPersonData] = useState([]);

  const refreshTable = () => {
    getPersons().then((data) => {
      setPersonData(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    refreshTable();
  }, []);

  const handleAddPerson = () => {
    const newPerson = {
      USER_NAME: "Testing",
      PASSWORD: "bruh",
      USER_TYPE: 2,
      USER_FNAME: "Test",
      USER_LNAME: "Person"
    }
    addPerson(newPerson).then(() => {
      refreshTable();
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Fragment>
      <Button variant="primary" onClick={handleAddPerson}>Add Person</Button>
      <Table bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Type</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Made</th>
          </tr>
        </thead>
        <tbody>
          {personData.map(person => (
            <tr key={person.USER_ID}>
              <td>{person.USER_ID}</td>
              <td>{person.USER_NAME}</td>
              <td>{person.PASSWORD}</td>
              <td>{person.USER_TYPE}</td>
              <td>{person.USER_FNAME}</td>
              <td>{person.USER_LNAME}</td>
              <td>{person.DATE_MADE}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default DisplayPersonData;
