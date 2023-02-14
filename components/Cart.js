import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { totalmem } from "os";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function Cart( { basket }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  
  function total(arr){
let sum = 0
for (let i = 0; i<arr.length; i++){
  sum += Number(arr[i].cost)
}
return sum
  }
 

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <Button
        variant="contained"
        endIcon={<ShoppingCartIcon />}
        alt="cart"
        // sx={{
        //   "margin-left": "20px",
        // }}
        onClick={toggleDrawer(true)}
      >
        Cart
      </Button>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller /><Box sx={{display: "flex", "flex-direction": "row", "justify-content": "space-between"}} >
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {basket.length < 1
              ? "Cart empty"
              : `Shopping cart: ${basket.length } fish`}
          </Typography>
          <Typography sx={{ p: 2, color: "text.secondary", "margin-right": "30px" }}>Subtotal: £{total(basket)}</Typography></Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          
          <Box variant="rectangular" height="100%">
         
          {basket.map((item) => { return(
            <Card
            key={basket.indexOf(item)}
            sx={{
              height: "100%",
              display: "flex",
              width: "65%",
              flexDirection: "row",
            }}
          >
          
            <CardMedia
              component="img"

              image={item.image}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
             
              <Typography
                sx={{
                
                  color: "grey",
                  size: "small",
                }}
              >
                £{item.cost}
              </Typography>
              
            </CardContent></Card>
          )})}
          </Box> </StyledBox>
        
      </SwipeableDrawer>
    </Root>
  );
}
