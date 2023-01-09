import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { Oval } from "react-loader-spinner";

export default function PostState({ isLoading, isLiked, handleLike }) {
  if (isLoading) {
    return (
      <Oval
        height={20}
        width={20}
        color="grey"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="black"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  } else if (isLiked) {
    return (
      <IoHeartSharp
        style={{ fontSize: "20px", color: "#AC0000" }}
        onClick={handleLike}
      />
    );
  } else {
    return (
      <IoHeartOutline
        style={{ fontSize: "20px", color: "#FFFFFF" }}
        onClick={handleLike}
      />
    );
  }
}
