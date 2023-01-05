import styled from "styled-components";

export default function LogoSignUpComponent() {
  return (
    <Logo>
      <Title>Linkr</Title>
      <Desc>save, share and discover the best links on the web</Desc>
    </Logo>
  );
}
const Logo = styled.div`
  width: 60vw;
  height: 100vh;
  background: #151515;
  box-sizing: border-box;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
  @media (max-width: 1075px) {
    width: 100vw;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  /* identical to box height */

  letter-spacing: 0.05em;
  color: #ffffff;
  font-family: "Passion One";
  @media (max-width: 1075px) {
    width: 167px;

    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 76px;
    line-height: 84px;
    /* identical to box height */

    letter-spacing: 0.05em;

    color: #ffffff;
  }
`;
const Desc = styled.p`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  font-family: "Passion One";
  color: #ffffff;

  @media (max-width: 1075px) {
    width: 300px;

    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 34px;
    text-align: center;

    color: #ffffff;
  }
`;
