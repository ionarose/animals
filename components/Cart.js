// import React from "react";

// const Cart = ({ bgimage, count }) => {
//   return (
//     <div  >
//       <h3>Cart</h3>
//       <hr />
//       <div>
//         {count > 0 ? (
//           <div >
//             <div >
//               {/* {bgimage.map(({ image, id }) => (
//                 <img src={image} key={id} alt="bg-img" />
//               ))} */}
//               <div>
//                 <p>Fall Limited Edition Sneakers</p>
//                 <p>
//                   $125 x {count} <span>${125 * count}</span>
//                 </p>
//               </div>
//             </div>
//             <button> Checkout</button>
//           </div>
//         ) : (
//           <p >Your cart is empty</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerBleeding = 56;



const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function Cart(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
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
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Cart empty</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
