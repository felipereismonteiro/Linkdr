import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext.js";
import { TokenContext } from "../../contexts/TokenContext.js";
import LogoSignUpComponent from "../../components/LogoSignComponent/LogoSignComponent";
import api from "../../services/api.js";
import Swal from "sweetalert2";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function signUp(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const body = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const signin = await api.signInUser(body);
      document.cookie = `${signin.data.token},${signin.data.user.id},${signin.data.user.user_name},${signin.data.user.profile_picture}`;
      setToken(signin.data.token);
      setUser(signin.data.user);
      navigate("/timeline");
      setLoading(false);
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: err.response.data,
        background: "black",
      })
      e.target.password.value = ""
      e.target.email.value = ""
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <LogoSignUpComponent />
        <SignUp>
          <Form onSubmit={signUp}>
            <input type="email" name="email" placeholder="e-mail" required />
            <input
              type="password"
              name="password"
              placeholder="password"
              required
            />
            {loading ? (
              <button disabled className="button" type="submit">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </button>
            ) : (
              <button className="button" type="submit">
                Sign In
              </button>
            )}
            <Link to="/signup" style={{ color: "gray", margin: "10px" }}>
              First time? Create an account!
            </Link>
          </Form>
        </SignUp>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  @media (max-width: 1075px) {
    display: flex;
    flex-direction: column;
  }
`;
const SignUp = styled.div`
  height: 100vh;
  width: 40vw;
  position: absolute;
  right: 0;
  background-color: #333333;
  @media (max-width: 1075px) {
    width: 100vw;
    height: 70vh;
    position: initial;
  }
  font-family: "Passion One";
`;
const Form = styled.form`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && input {
    width: 429px;
    height: 65px;
    margin: 10px;
    box-sizing: border-box;
    padding: 20px;

    background: #ffffff;
    border-radius: 6px;
    outline: none;

    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;

    &::placeholder {
      font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;
    }

    @media (max-width: 1075px) {
      width: 330px;
      height: 55px;
    }
    @media (max-width: 350px) {
      width: 90vw
    }
  }
  && .button {
    width: 429px;
    height: 65px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: #1877f2;
    border-radius: 6px;
    border:none;
    cursor: pointer;

    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    /* identical to box height */

    color: #ffffff;
    @media (max-width: 1075px) {
      width: 330px;
      height: 55px;
    }
    @media (max-width: 350px) {
      width: 90vw
    }
  }
  && p {
    margin: 10px;
  }
  @media (max-width: 1075px) {
    height: auto;
  }
`;
