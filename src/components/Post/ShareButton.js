import { useContext, useEffect, useState } from "react";
import RepostImg from "../../assets/images/repost.svg";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext";
import api from "../../services/api";
import { UserContext } from "../../contexts/UserContext";

export default function ShareButton({ post, renderPosts }) {
    const { shares } = post
    const { token } = useContext(TokenContext);
    // const { user } = useContext(UserContext);
    const [sharesAmount, setSharesAmount] = useState(Number(shares))

  
    async function handleShare() {
      try {
          
      } catch (err) {
        console.log(err.message);
      }
    }
  
    return (
      <Container>
        <RepostIcon src={RepostImg} />
        <p>{post.shares} re-posts</p>
      </Container>
    );
  }

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    cursor: pointer;

    & p {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        color: #FFFFFF;
    }
  `

  const RepostIcon = styled.img`
    width: 20px;
  `