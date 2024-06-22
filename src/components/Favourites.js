import Table from "./common/Table";
import styled from "@emotion/styled";
import { useHipolabsState } from "./contexts/HipolabsContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`

const Favourites = () => {
  const { favourites } = useHipolabsState();

  return (
    <Container>
      <Table data={favourites}/>
    </Container>
  );
}

export default Favourites;