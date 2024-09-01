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
import AddProductModal from "@/components/AddProductModal/AddProductModal";
import { grey } from "@mui/material/colors";

const thOverrides = {
  fontWeight: "bold",
  color: "black"
};

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
  }, [dispatch, token]);

  return (
    <>
      <Container sx={{ height: "calc(100vh - 160px)" }} maxWidth="lg" >
        <Loading status={loading} error={error}>
          <AddProductModal />
          <TableContainer sx={{ mt: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#c6c6c6" }}>
                <TableRow>
                  <TableCell sx={thOverrides}>#</TableCell>
                  <TableCell sx={thOverrides} align="center">Title</TableCell>
                  <TableCell sx={thOverrides} align="center">Price</TableCell>
                  <TableCell sx={thOverrides} align="center">Quantity</TableCell>
                  <TableCell sx={thOverrides} align="center">Operations</TableCell>
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
