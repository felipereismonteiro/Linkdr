import styled from "styled-components";
import { Oval } from "react-loader-spinner";

export function ScrollLoading() {
  return (
    <Container>
      <Oval
        height={40}
        width={40}
        color="#6D6D6D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#6D6D6D"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
      <LoadingMessage>Loading more posts...</LoadingMessage>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 80px 0 330px 0;
`;

const LoadingMessage = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.05em;
  color: #6d6d6d;
`;
