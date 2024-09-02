import ProductsTable from "@/components/ProductsTable/ProductsTable";
import { Container } from "@mui/material";

const Home = () =>
{

  return (
    <>
      <Container sx={{ height: "calc(100vh - 160px)" }} maxWidth="lg" >
        <ProductsTable />
      </Container>
    </>
  );
}

export default Home;
