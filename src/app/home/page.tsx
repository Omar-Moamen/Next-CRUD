"use client";

import
{
  TableContainer, Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from "@mui/material";
import ProductsList from "@/components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "@/store/rtkHooks";
import { actGetAllProducts } from "@/store/products/act/actGetAllProducts";
import { useEffect } from "react";
import Loading from "@/components/feedback/Loading/Loading";

const Home = () =>
{
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const { records, loading, error } = useAppSelector(state => state.products);

  useEffect(() =>
  {
    if (token)
    {
      dispatch(actGetAllProducts(token));
    }
    // promise.abort() will cancel the request if a user bounce occurred
  }, [dispatch, token]);

  return (
    <>
      <Container sx={{ height: "calc(100vh - 160px)" }} maxWidth="lg" >
        <Loading status={loading} error={error}>
          <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                <ProductsList records={records} />

              </TableBody>
            </Table>
          </TableContainer>
        </Loading>
      </Container>
    </>
  );
}

export default Home;
