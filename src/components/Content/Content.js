import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import { appStore } from "../../store/AppStore";
import GameHistoryTable from "./GameHistoryTable";
import GameDialog from "./GameDialog";
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(5),
    flexDirection: "row",
  },
  gameBegin: {
    marginLeft: theme.spacing(30),
    flexGrow: 1,
    backgroundColor:"black",
    color:"white",
  },
  spin:{
    alignItems: "center",
    paddingLeft: theme.spacing(10),
    marginLeft: theme.spacing(10)
  }
}));

function Content() {
  const classes = useStyles();
  const { username, login } = appStore;
  const [gameOpen, setGameOpen] = React.useState(false);

  const startGame = async () => {
    if (!username) {
      await login("Guest");
    }
    setGameOpen(true);
  };

  return (
    <Grid container component="main" maxWidth="sm" className={classes.content}>
      <Grid item xs={6}>
        <GameHistoryTable />
        <GameDialog open={gameOpen} setOpen={setGameOpen} />
      </Grid>
      <Grid item xs={6}>
        <img src="images/spin2.gif" className={classes.spin}/>
        <Button
          className={classes.gameBegin}
          variant="contained"
          color="black"
          onClick={startGame}
        >
          Start game as {username || "a Guest"}
        </Button>
      </Grid>
      
    </Grid>
  );
}

export default observer(Content);
