import { useContext, useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext";
import api from "../../services/api";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { UserContext } from "../../contexts/UserContext";

export function Likes({ post, renderPosts }) {
  const { id, is_liked, liked_by, likes } = post;
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(is_liked)
  const [likesAmount, setLikesAmount] = useState(Number(likes))

  function handleTooltipContent() {
    let content;

      if (liked) {
      const sortedUsers = liked_by.filter((obj) => obj.id !== Number(user.id));
      sortedUsers.splice(0, 0, { id: Number(user.id), user_name: user.user_name });

      if (likesAmount === 1) {
        content = `You`;
      } else if (likesAmount === 2) {
        content = `You and ${sortedUsers[1]?.user_name}`;
      } else if (likesAmount > 2) {
        content = `You, ${sortedUsers[1]?.user_name} and other ${
          likesAmount - 2
        } people`;
      }
    } else {
      const sortedUsers = liked_by.filter((obj) => obj.id !== Number(user.id));
      sortedUsers.splice(0, 0, { id: Number(user.id), user_name: user.user_name });

      if (likesAmount === 0) {
        content = `Be the first to like this post`;
      } else if (likesAmount === 1) {
        content = sortedUsers[1].user_name;
      } else if (likesAmount === 2) {
        console.log(likesAmount)
        content = `${sortedUsers[1].user_name} and ${sortedUsers[2].user_name}`;
      } else if (likesAmount > 2) {
        content = `${sortedUsers[1].user_name}, ${
          sortedUsers[2].user_name
        } and other ${likesAmount - 2} people`;
      }
    }
    return content;
  }

  async function handleLike() {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
        if (liked) {
        setLiked(false)
        setLikesAmount(likesAmount - 1)
        await api.unlikePost(id, token);
        await renderPosts();
        setIsLoading(false);
      } else {
        setLiked(true)
        setLikesAmount(likesAmount + 1)
        await api.likePost(id, token);
        await renderPosts();
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Container>
      {liked ? (
        <IoHeartSharp
          style={{ fontSize: "20px", color: " #AC0000" }}
          onClick={handleLike}
        />
      ) : (
        <IoHeartOutline
          IoHeartOutline
          style={{ fontSize: "20px", color: "#FFFFFF" }}
          onClick={handleLike}
        />
      )}
      <LikesAmount id={id}>{likesAmount} likes</LikesAmount>
      <Tooltip
        anchorId={id}
        place="bottom"
        content={handleTooltipContent()}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#505050",
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 53px;
  height: 53px;
  margin-top: 20px;
  cursor: pointer;
`;
const LikesAmount = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  margin-top: 3px;
`;
