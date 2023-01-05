import styled from "styled-components";
import Hashtag from "./Hashtag";

export default function HashtagTable() {
  return (
    <Container>
      <Title>trending</Title>
      <HashtagContainer>
        <Hashtag />
        <Hashtag />
      </HashtagContainer>
    </Container>
  );
}

const Container = styled.section`
  height: 405px;
  width: 300px;
  background: #171717;
  margin-top: 143px;
  margin-left:25px;
  border-radius: 16px;
`;
const Title = styled.h2`
  height: 60px;
  width: 100%;
  padding: 10px 0px 10px 15px;
  border-bottom: 1px solid #484848;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
  cursor: pointer;
`;

const HashtagContainer = styled.div`
  height: 240px;
  width: 100%;
  padding: 20px 0px 30px 16px;
`;
