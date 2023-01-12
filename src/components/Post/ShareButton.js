import { useContext, useEffect, useState } from "react";
import RepostImg from "../../assets/images/repost.svg";
import styled from "styled-components";
import { TokenContext } from "../../contexts/TokenContext";
import api from "../../services/api";
import Swal from "sweetalert2";

export default function ShareButton({ post, renderPosts }) {
    const { shares, id } = post
    const { token } = useContext(TokenContext);
    const [sharesAmount, setSharesAmount] = useState(Number(shares))

  
    async function handleShare() {

      try {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-light",
          },
          buttonsStyling: true,
        });
  
        swalWithBootstrapButtons
          .fire({
            title: "Do you really want to share this post?",
            showCancelButton: true,
            confirmButtonText: "Yes, share!",
            confirmButtonColor: "blue",
            cancelButtonText: "No, cancel",
            reverseButtons: true,
            background: "black",
            color: "white",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await api.sharePost(id, token)
              setSharesAmount(sharesAmount + 1);
              swalWithBootstrapButtons.fire({
                title: "Shared!",
                text: "Successfully shared!.",
                background: "black",
                color: "white",
              });
              await renderPosts();
            }
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  
    return (
      <Container onClick={handleShare}>
        <RepostIcon src={RepostImg} />
        <p>{sharesAmount} re-posts</p>
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

    &:hover img {
      filter: blur(0.5px);
      filter: drop-shadow(0 0 5px grey);
    }
  `

  const RepostIcon = styled.img`
    width: 20px;
  `