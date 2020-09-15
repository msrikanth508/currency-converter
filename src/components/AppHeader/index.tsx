import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PocketsModal from "../Pockets";
import BallotIcon from "@material-ui/icons/Ballot";
import IconButton from "@material-ui/core/IconButton";
import { PocketsShape, TransactionsShape } from "../../types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiIconButton-root": {
      color: "#fff",
      padding: 0,
      "& .MuiSvgIcon-root": {
        fontSize: theme.spacing(4),
      },
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppHeader({
  pockets,
  transactions,
}: {
  pockets: PocketsShape;
  transactions: Array<TransactionsShape>;
}) {
  const classes = useStyles();
  const [showFunds, setShowFunds] = React.useState(false);

  function handleModalOpenClose() {
    setShowFunds((prevState) => !prevState);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Currency Converter
          </Typography>

          <IconButton
            aria-label="open pockets"
            size="medium"
            onClick={handleModalOpenClose}
          >
            <BallotIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {showFunds && (
        <PocketsModal
          pockets={pockets}
          transactions={transactions}
          handleClose={handleModalOpenClose}
        />
      )}
    </div>
  );
}
