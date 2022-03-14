import { useState, useEffect } from "react";
import axios from "axios";
import ls from "local-storage";

import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const User_Requests = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
      axios
          .post("http://localhost:4000/requests/view", { borrower_email: ls.get("email") })
          .then((res) => {
              console.log(res.data);
              setRequests(res.data);
          })
          .catch((err) => {
              console.log(err);
          });
  }, []);
  
  const onCancel = args => event => {
      axios
          .post("http://localhost:4000/requests/delete", { _id: requests[args]._id })
          .then((res) => {
              console.log(res.data);

              alert(`Request ${requests[args].name} deleted.`);
              window.location.reload();
          })
          .catch((err) => {
              console.log(err);

              console.log(err.response.data);
              alert(err.response.data[Object.keys(err.response.data)[0]]);

              window.location.reload();
          });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, background: "rgba(0, 0, 0, 0.1)" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"> Sr No. </TableCell>
            <TableCell align="center"> Amount </TableCell>
            <TableCell align="center"> Status </TableCell>
            <TableCell align="center"> Date </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((row, ind) => (
            <TableRow
                key={ind}
              >
                <TableCell align="center">{ind + 1}</TableCell>  
                <TableCell align="center"> {row.amount} </TableCell>
                <TableCell align="center">
                    <Typography
                        style={{
                            backgroundColor:
                                (row.status === "Pending" && "grey") ||
                                (row.status === "Waiting" && "grey") ||
                                (row.status === "Complete" && "green") ||
                                (row.status === "Rejected" && "red"),
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            margin: "5px"
                        }}
                    >
                      { row.status }
                    </Typography>
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">
                      <Button variant="contained" onClick={onCancel(ind)} sx={{ ml: 2 }} > Delete </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default User_Requests;