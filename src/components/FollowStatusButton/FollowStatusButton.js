import { useState } from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

export default function FollowStatusButton({ isFollowed }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
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
  position:absolute;
  left:820px;
  cursor: pointer;
  color: ${(props) => (props.isFollowed ? "#1877F2" : "#FFFFFF")};
  background: ${(props) => (props.isFollowed ? "#FFFFFF" : " #1877F2")};
`;
