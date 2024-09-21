"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/rtkHooks";
import { deleteProduct } from "@/store/products/actions/deleteProduct";
import { TProduct } from "@/types/product";
import TooltipButton from "../TooltipButton/TooltipButton";
import { TableCell, TableRow } from "@mui/material";
import { grey } from "@mui/material/colors";
// Styles
import styles from './styles.module.css';

type TProps = TProduct & { idx?: number };

const { orderCell, titleCell, btnsContainer } = styles;

const Product = ({ _id, title, price, quantity, idx }: TProps) =>
{
   const dispatch = useAppDispatch();
   const { token, user } = useAppSelector(state => state.auth);
   const router = useRouter();


   return (
      <>
         <TableRow sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:nth-of-type(even)': { bgcolor: grey[900] }
         }}
         >
            <TableCell className={orderCell} scope="row"> {`#${idx! + 1}`}</TableCell>
            <TableCell className={titleCell} align="center">{title}</TableCell>
            <TableCell align="center">&#36;{price}</TableCell>
            <TableCell align="center">{quantity}</TableCell>
            <TableCell align="center">
               <div className={btnsContainer}>
                  <TooltipButton
                     text="Details"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user ? false : true}
                     color="info"
                     onClick={() => router.push(`/product/${_id}`)}
                  />
                  <TooltipButton
                     text="Edit"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.role === "SuperAdmin" ? false : true}
                     color="success"
                     onClick={() => router.push(`/product/${_id}/edit`)}
                  />
                  <TooltipButton
                     text="Delete"
                     title="You don't have this permission"
                     placement="top"
                     disabled={token && user && user.role === "SuperAdmin" ? false : true}
                     color="error"
                     onClick={() => dispatch(deleteProduct({ _id, token }))}
                  />
               </div>
            </TableCell>

         </TableRow >
      </>
   )
}

export default Product;
