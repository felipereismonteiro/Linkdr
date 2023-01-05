import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext.js";
import { TokenContext } from "../../contexts/TokenContext.js";
import LogoSignUpComponent from "../logoSignCOmponent";

export default function SignInComponent() {
  console.log(UserContext)
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const {token, setToken} = useContext(TokenContext);
  const navigate = useNavigate();

  async function signUp(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const config = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      // const signin = await axios.post("https://linkr-api-hhbp.onrender.com/signin", config);
      const signin = await axios.post("http://localhost:4000/signin", config);
      console.log(signin)
      document.cookie = signin.data.token;
      setToken(signin.data.token)
      setUser(signin.data.user)
      navigate("/timeline")
      setLoading(false);
      
    } catch (err) {
      alert(err.response);
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
                Sign Up
              </button>
            )}
            <Link to="/signup" style={{ color: "gray", margin: "10px" }}>
              Switch back to log in
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

    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;

    color: #9f9f9f;

    @media (max-width: 1075px) {
      width: 330px;
      height: 55px;
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
  }
  && p {
    margin: 10px;
  }
  @media (max-width: 1075px) {
    height: auto;
  }
`;
