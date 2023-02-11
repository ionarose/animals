import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import SetMealTwoToneIcon from "@mui/icons-material/SetMealTwoTone";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AlertDialogSlide from "../components/Popup";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const theme = createTheme();

export default function Album() {
  const [fish, setFish] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://www.fishwatch.gov/api/species`);
      const data = await response.json();
      setFish(data);
    }
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  function format(input) {
    return input.toLowerCase().replace(/\s+/g, "-");
  }

  async function searchBySpecies(search) {
    const response = await fetch(
      `https://www.fishwatch.gov/api/species/${format(search)}`
    );
    const data = await response.json();
    setFish(data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    searchBySpecies(searchTerm);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <SetMealTwoToneIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Rent a fish
            </Typography>
            <form onSubmit={handleSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search by species"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </Search>
            </form>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Rent a fish, large or small. Big event? Rent &apos;em all!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {fish.map((card) => {
              const images = card["Image Gallery"];

              if (!images || !images.length) {
                return null;
              }

              return (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    key={card["Species Name"]}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        pt: "0.%",
                      }}
                      image={images[0].src}
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card["Species Name"]}
                      </Typography>
                      <Typography>{card["Scientific Name"]}</Typography>
                      <Typography
                        sx={{
                          float: "right",
                          color: "grey",
                          size: "small",
                        }}
                      >
                        £{card.Calories}/week
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <AlertDialogSlide
                        name={card["Species Name"]}
                        desc={card["Physical Description"]}
                        images={card["Image Gallery"]}
                        Habitat={card.Habitat}
                        biology={card.Biology}
                        illustration={card["Species Illustration Photo"].src}
                        cost={card.Calories}
                      />

                      <Button
                        variant="contained"
                        endIcon={<AddShoppingCartIcon />}
                        sx={{
                          "margin-left": "25px"
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Rent a Fish
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Created by Iona Rose with Next.js and Material UI
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';
