import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../services/api";
import Hashtag from "./Hashtag";
import { Oval } from "react-loader-spinner";

export default function SideBar() {
  const [hashtags, setHashtags] = useState(null);

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const resp = await api.getHashtags();
        setHashtags(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHashtags();
  }, []);

  return (
    <Container hashtags={hashtags}>
      { hashtags ? (
      <>
      <Title>trending</Title>
      <HashtagContainer loading={hashtags ? false : true}>
        {hashtags?.map((hashtag, index) => (
          <Hashtag
            key={hashtag.id}
            id={hashtag.id}
            name={hashtag.name}
          />
          ))}
      </HashtagContainer>
      </>
      ) : (
        <>
        </>
      )
      }
      
    </Container>
  );
}

const Container = styled.section`
  height: 400px;
  width: 300px;
  background: ${props => props.hashtags ? '#171717' : 'grey'};
  margin-left: 25px;
  border-radius: 16px;

  @media (max-width: 950px) {
    display: none;
  }
`;
const Title = styled.h2`
  height: 60px;
  width: 100%;
  padding: 10px 0px 10px 15px;
  border-bottom: 1px solid #484848;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
  cursor: pointer;
`;

const HashtagContainer = styled.div`
  height: 340px;
  width: 100%;
  padding: 20px 0px 30px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.loading === true ? "center" : "flex-start"};
  align-items: ${(props) => (props.loading === true ? "center" : "flex-start")};
`;
