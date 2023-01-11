import { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext";
import api from "../../services/api";

export default function FollowStatusButton({
  isFollowed,
  setUpdate,
  id,
  update,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(TokenContext);
 console.log(token)
  async function handleFollowStatus() {
    setIsLoading(true);
    try {
      if (!isFollowed) {
        await api.followUser(id, token);
        setUpdate(!update);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      alert("something went wrong");
    }
  }

  return (
    <Container
      onClick={handleFollowStatus}
      isLoading={isLoading}
      isFollowed={isFollowed}
    >
      {isLoading && (
        <Oval
          height={20}
          width={20}
          color="black"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#gray"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      {isFollowed && !isLoading && "Unfollow"}
      {!isFollowed && !isLoading && "Follow"}
    </Container>
  );
}

const Container = styled.button`
  width: 112px;
  height: 31px;
  border-radius: 5px;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 820px;
  cursor: pointer;
  pointer-events: ${(props) => (props.isLoading ? "none" : "")};
  opacity: ${(props) => (props.isLoading ? "0.6" : "1")};
  color: ${(props) => (props.isFollowed ? "#1877F2" : "#FFFFFF")};
  background: ${(props) => (props.isFollowed ? "#FFFFFF" : " #1877F2")};
`;
