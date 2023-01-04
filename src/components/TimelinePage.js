import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar.js";
import Post from "./Post.js";
import Title from "./Title.js";
import axios from "axios"

export default function TimelinePage() {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        renderPosts()
    }, [])

    async function renderPosts() {
        console.log("A função renderPosts será implementada em breve")
    }

    async function publish(e) {
        e.preventDefault()

        setLoading(true);

        const postInfo = {
            user_id: 5,
            url: e.target.url.value,
            content: e.target.content.value
        }
        try {
            await axios.post("https://linkr-api-hhbp.onrender.com/posts", postInfo)
            // await axios.post("http://localhost:4000/posts", postInfo)
            setLoading(false)
            e.target.url.value = "";
            e.target.content.value = "";
            renderPosts()
        } catch(err) {
            alert("Houve um erro ao publicar se link")
            setLoading(false)
        }
        
    }

    return(
        <>
        <Navbar />
        <Container>
            <CentralDiv>
                <Title />
                <PostDiv>
                    {/* <UserPic src={userPic} alt="User picture"/> */}
                    <UserPic src="https://s1.r29static.com/bin/entry/b52/0,46,460,460/1200x1200,80/1471901/image.jpg" alt="User picture"/>
                    <Form onSubmit={publish} >
                        <FormTitle>What are you going to share today?</FormTitle>
                        <UrlInput type="url" name="url" placeholder="http://..." required disabled={loading}/>
                        <ContentInput name="content" placeholder="Awesome article about #javascript" disabled={loading}/>
                        <ButtonDiv>
                            <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish"}</Button>
                        </ButtonDiv>
                    </Form>
                </PostDiv>
                <Post />
                <Post />
                <Post />
            </CentralDiv>
        </Container>
        </>
        
    )
}

const Container = styled.div`
    width: 100vw;
    min-height: calc(100vh - 68px);
    background-color: #333333;
    margin-top: 68px;
    display: flex;
    justify-content: center;
`

const CentralDiv = styled.div`
    width: 611px;
    height: auto;
    margin-top: 78px;
`
const PostDiv = styled.div`
    width: 100%;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 18px;
    margin-bottom: 29px;
`

const UserPic = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    
`
const Form = styled.form`
    width: 503px;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 5px;
`
const FormTitle = styled.h2`
    font-family: 'Lato';
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    margin-bottom: 10px;
`
const UrlInput = styled.input`
    font-family: 'Lato', sans-serif;
    width: 100%;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    outline: none;
    padding-left: 13px;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
`

const ContentInput = styled.textarea`
    font-family: 'Lato', sans-serif;
     width: 100%;
    height: 66px;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    outline: none;
    padding-left: 13px;
    padding-top: 8px;
    text-align: start;
    box-sizing: border-box;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
`

const ButtonDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
const Button = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    /* pointer-events: none; */
`