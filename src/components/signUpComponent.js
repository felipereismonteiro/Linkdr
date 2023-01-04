import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function SignUpComponent() {
    const [loading, setLoading] = useState(false);

    async function signUp(e) {
        setLoading(true);
        e.preventDefault();

        const config = {
            user_name: e.target.username.value,
            email: e.target.email.value,
            password:  e.target.password.value,
            profile_picture: e.target.url.value
        }

        try {
            const signup = await axios.post("https://linkr-api-hhbp.onrender.com/signup", config); 
            alert(signup.data)
            setLoading(false);
        } catch (err) {
            console.log(err.response.data);
            setLoading(false);
        }
    }

    return(
        <>
            <Container>
                <Logo>
                    <Title>
                        Linkr
                    </Title>
                    <Desc>
                        save, share and discover the best links on the web 
                    </Desc>
                </Logo>
                <SignUp>
                    <Form onSubmit={signUp}>
                        <input type="email" name="email" placeholder="e-mail" required />
                        <input type="password" name="password" placeholder="password" required />
                        <input type="name" name="username" placeholder="username" required />
                        <input type="url" name="url" placeholder="picture url" required />
                        {loading 
                            ? <button disabled className="button" type="submit"><ThreeDots
                            height="80" 
                            width="80" 
                            radius="9"
                            color="black" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                             /></button>
                            : <button className="button" type="submit">Sign Up</button> }
                        <Link style={{color: "gray", margin: "10px"}}>Switch back to log in</Link>
                    </Form>
                </SignUp>
            </Container>
        </>
    )
}
const Container = styled.div`
    display: flex;
    @media (max-width: 1075px) {
        display: flex;
        flex-direction: column;
    }
`
const Logo = styled.div`
    width: 60vw;
    height: 100vh;
    background: #151515;
    box-sizing: border-box;
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    @media (max-width: 1075px) {
        width: 100vw;
        height: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
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
`
const Title = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    /* identical to box height */

    letter-spacing: 0.05em;
    color: #FFFFFF;

    @media (max-width: 1075px) {
        width: 167px;

        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 76px;
        line-height: 84px;
        /* identical to box height */

        letter-spacing: 0.05em;

        color: #FFFFFF;
    }
`
const Desc = styled.p`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;

    color: #FFFFFF;

    @media (max-width: 1075px) {
        width: 300px;

        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 23px;
        line-height: 34px;
        text-align: center;

        color: #FFFFFF;

    }
`
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

        background: #FFFFFF;
        border-radius: 6px;

        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;


        color: #9F9F9F;

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

        background: #1877F2;
        border-radius: 6px;

        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        /* identical to box height */


        color: #FFFFFF;   
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
`