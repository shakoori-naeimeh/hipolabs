import Table from "./common/Table";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`

const Favourites = () => {
  return (
    <Container>
      <Table/>
    </Container>
  );
}

export default Favourites;