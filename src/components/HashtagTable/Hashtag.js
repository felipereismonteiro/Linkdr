import styled from "styled-components";

export default function Hashtag() {
  return <Container># oieie</Container>;
}

const Container = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin-bottom: 3px;
  cursor: pointer;
  overflow-y: auto;
`;
