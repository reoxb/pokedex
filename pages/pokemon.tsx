import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../src/NavBar";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#B3A125",
    fontFamily: "Pokemon",
    textShadow: "initial",
    textTransform: "uppercase",
    letterSpacing: "0.4rem",
  },
  cardText: {
    fontFamily: "Pokemon",
    textTransform: "capitalize",
    letterSpacing: "0.4rem",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    color: "#AAE",
    display: "flex",
    flexDirection: "column",
    margin: "3.5em 1em 0 0",
    boxShadow:
      "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)",
    borderRadius: "10px",
    border: "1px inset rgba(255,222,0,0.8)",
  },
  cardCategory: {
    marginTop: "10px",
    "& svg": {
      position: "relative",
      top: "8px",
    },
  },
  stats: {
    color: "#AAE",
    display: "flex",
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "3px",
      marginRight: "3px",
      marginLeft: "3px",
      fontSize: "20px",
      lineHeight: "20px",
    },
    "& svg": {
      position: "relative",
      top: "3px",
      marginRight: "3px",
      marginLeft: "3px",
      width: "20px",
      height: "20px",
    },
  },
  mlAuto: {
    marginLeft: "auto",
  },
}));

export default function pokemon({ pokemon }: any) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography
            className={classes.title}
            component="h1"
            variant="h4"
            align="center"
          >
            {pokemon.name}
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={8} md={6}>
              <img src={pokemon.image} alt={pokemon.name} />
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom className={classes.cardText}>
                    Types: {' '}
                    {pokemon.types.map((type: any, index: number) => (
                        <span key={index}>{type.type.name + ' '}</span>
                    ))}
                  </Typography>
                  <br></br>
                  <Typography variant="subtitle1" className={classes.cardText}>
                    <p> &nbsp;&nbsp;&nbsp;
                      <span>Height: </span>
                      {pokemon.height}
                    </p>
                    <p> &nbsp;&nbsp;&nbsp;
                      <span>Weight: </span>
                      {pokemon.weight}
                    </p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className={classes.stats  + " " + classes.mlAuto}>
                    Pokemon ID: {pokemon.id}
                  </div>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

type QueryParam= { 
  query : {
    id: number,
    search: string
  }
}

export async function getServerSideProps({ query }: QueryParam) {
  const id = query.id;
  const param = query.search || 1;

  console.log(param);
  

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id || param}`);
    const pokemon = await res.json();
    const paddedIndex = ("00" + (id || pokemon.id)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon },
    };
  } catch (error) {}
}
