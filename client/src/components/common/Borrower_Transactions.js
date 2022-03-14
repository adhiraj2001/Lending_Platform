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


const Borrower_Transactions = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:4000/transactions/view_borrower", { borrower_email: ls.get("email") })
            .then((res) => {
                console.log(res.data);
                setTransactions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        
        console.log(transactions);
    }, []);

    //! ^ RELOAD THIS PAGE ON STATE VARIABLE STATUS ^ !//

    // const onTransaction = args => event => {
    //     const updateTransaction = {
    //         _id: transactions[args]._id,
    //         borrower_email: transactions[args].borrower_email,
    //         lender_email: transactions[args].lender_email,
    //         amount: transactions[args].amount,
    //         status: "Completed"
    //     };

    //     if (transactions[args].status === "Placed") {
    //         updateTransaction.status = "Accepted";
    //     }
    //     else if (transactions[args].status === "Accepted") {
    //         updateTransaction.status = "Cooking";
    //     }
    //     else if (transactions[args].status === "Cooking") {
    //         updateTransaction.status = "Ready for Pickup";
    //     }

    //     axios
    //         .post("http://localhost:4000/transactions/update", updateTransaction)
    //         .then((res) => {
    //             console.log(res.data);
    //             transactions[args].status = updateTransaction.status;

    //             alert(`Transfer completed`);
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             console.log(err);

    //             console.log(err.response.data);
    //             alert(err.response.data[Object.keys(err.response.data)[0]]);

    //             window.location.reload();
    //         });
    // }

    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, background: "rgba(0, 0, 0, 0.1)" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"> Sr No.</TableCell>
            <TableCell align="center"> Borrower_Email </TableCell>
            <TableCell align="center"> Lender_Email </TableCell>
            <TableCell align="center"> Amount </TableCell>
            <TableCell align="center"> Date </TableCell>
            {/* <TableCell align="center"> Status </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, ind) => (
            <TableRow
                key={ind}
              >
                <TableCell align="center">{ind + 1}</TableCell>  
                <TableCell align="center"> {row.borrower_email} </TableCell>
                <TableCell align="center">{row.lender_email}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                {/* <TableCell align="center">
                      <Typography
                          style={{
                              backgroundColor:
                                  (row.status === "Placed" && "grey") ||
                                  (row.status === "Accepted" && "green") ||
                                  (row.status === "Cooking" && "yellow") ||
                                  (row.status === "Ready for Pickup" && "blue") ||
                                  (row.status === "Completed" && "green") ||
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
                </TableCell> */}
                {/* <TableCell align="center">
                      <Button variant="contained" onClick={onOrder1(ind)} disabled={row.status !== "Placed" && row.status !== "Accepted" && row.status !== "Cooking"} sx={{ ml: 2 }} > Pick Up </Button>
                      <Button variant="contained" onClick={onOrder2(ind)} disabled={row.status === "Completed" || row.status === "Rejected"} sx={{ ml: 2 }} > Cancel </Button>
                </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Borrower_Transactions;