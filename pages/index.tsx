import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Star from "@material-ui/icons/ControlPointDuplicateOutlined";
import Detail from "@material-ui/icons/Details";

import Link from "../src/Link";
import NavBar from "../src/NavBar";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 0",
    boxShadow: "0 1px 4px 0 rgba(204, 0.14)",
    borderRadius: "3px",
    background: "#fff",
    "&:hover": {
      boxShadow: "-1px 10px 19px 0px rgba(0,0,0,0.8)",
      transform: "scale(1.01)",
    }
  },
  cardTitle: {
    color: "#B3A125",
    fontFamily: "Pokemon",
    textTransform: "capitalize",
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    letterSpacing: "0.17rem"
  },
  cardMedia: {
    paddingTop: "95%",
  },
  cardCategory: {
    color: "#AAE",
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Home({ pokemons } : any) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {pokemons.map((pokemon : any, index: number) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Link href={`/pokemon?id=${index + 1}`} underline="none">
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={pokemon.image}
                      title={pokemon.name}
                    />
                    <CardContent>
                      <Typography
                        className={classes.cardTitle}
                        variant="h5"
                        align="center"
                        component="h3"
                      >
                        {pokemon.name}
                      </Typography>
                      <Typography
                        className={classes.cardCategory}
                        variant="subtitle2"
                        align="center"
                        component="h5"
                      >
                        POKEMON / POKEDEX #{index + 1}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div className={classes.stats + " " + classes.mlAuto }>
                        <Detail />
                        <Star />
                        {index + 1}
                      </div>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const { results } = await res.json();

    const pokemons = results.map((result: any, index: number) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });

    return {
      props: { pokemons },
    };
  } catch (error) {
    console.error(error);
  }
}
