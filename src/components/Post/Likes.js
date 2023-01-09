import { useContext, useState } from "react";
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

  function handleTooltipContent() {
    let content;
    const likesAmount = Number(likes);
    if (is_liked) {
      const sortedUsers = liked_by.filter((obj) => obj.id !== Number(user.id));
      sortedUsers.splice(0, 0, { id: Number(user.id), user_name: user.user_name });

      if (likesAmount === 1) {
        content = `You`;
      } else if (likesAmount === 2) {
        content = `You and ${sortedUsers[1].user_name}`;
      } else if (likesAmount > 2) {
        content = `You, ${sortedUsers[1].user_name} and other ${
          likesAmount - 2
        } people`;
      }
    } else {
      if (likesAmount === 0) {
        content = `Be the first to like this post`;
      } else if (likesAmount === 1) {
        content = liked_by[0].user_name;
      } else if (likesAmount === 2) {
        content = `${liked_by[0].user_name} and ${liked_by[1].user_name}`;
      } else if (likesAmount > 2) {
        content = `${liked_by[0].user_name}, ${
          liked_by[1]
        }.user_name and other ${likesAmount - 2} people`;
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
      if (is_liked) {
        await api.unlikePost(id, token);
        setIsLoading(false);
        renderPosts();
      } else {
        await api.likePost(id, token);
        setIsLoading(false);
        renderPosts();
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Container>
      {is_liked ? (
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
      <LikesAmount id={id}>{likes} likes</LikesAmount>
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
