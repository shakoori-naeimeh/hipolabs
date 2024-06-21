import Table from "./common/Table";
import styled from "@emotion/styled";
import { useHiplabsState } from "./reducers/HiplabsContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`


const Favourites = () => {
  const { favourites } = useHiplabsState();

  return (
    <Container>
      <Table data={favourites}/>
    </Container>
  );
}

export default Favourites;