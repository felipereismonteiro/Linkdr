import { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext";
import api from "../../services/api";

export default function FollowStatusButton({ isFollowed, id }) {
  const [status, setStatus] = useState(isFollowed);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(TokenContext);

  async function handleFollowStatus() {
    setIsLoading(true);

    try {
      if (status) {
        const resp = await api.unfollowUser(id, token);
        setIsLoading(false);
        setStatus(resp.data);
      } else {
        const resp = await api.followUser(id, token);
        setIsLoading(false);
        setStatus(resp.data);
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
      status={status}
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
      {status && !isLoading && "Unfollow"}
      {!status && !isLoading && "Follow"}
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
  color: ${(props) => (props.status ? "#1877F2" : "#FFFFFF")};
  background: ${(props) => (props.status ? "#FFFFFF" : " #1877F2")};
`;
