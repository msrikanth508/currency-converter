import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { currencyFormatter } from "../../utils/formatter";
import { PocketsShape, TransactionsShape } from "../../types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogContent-root": {
      paddingTop: theme.spacing(3),
    },
  },
  table: {
    minWidth: 250,
  },
}));

type Props = {
  handleClose: () => void;
  pockets: PocketsShape;
  transactions: Array<TransactionsShape>;
};

export default function PocketsModal({
  handleClose,
  pockets,
  transactions,
}: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog
        className={classes.root}
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Pockets" />
            <Tab label="Transactions" />
          </Tabs>
        </Paper>
        <DialogContent>
          {value === 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Currency</TableCell>
                    <TableCell align="right">Funds</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pockets.map((pocket) => (
                    <TableRow key={pocket.id}>
                      <TableCell align="right">{pocket.name}</TableCell>
                      <TableCell align="right">
                        {currencyFormatter(pocket.value, pocket.id)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {value === 1 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length ? (
                    <>
                      {transactions.map((activity) => (
                        <TableRow key={activity.message}>
                          <TableCell align="right">{activity.date}</TableCell>
                          <TableCell align="right">
                            {activity.message}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={2}>No transactions found.</TableCell>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
