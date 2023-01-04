import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar.js";
import Post from "./Post.js";
import Title from "./Title.js";
import axios from "axios"

export default function TimelinePage() {

    const [loading, setLoading] = useState(true);
    const [isPublishing, setIsPublishing] = useState(false);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        renderPosts()
    }, [])

    async function renderPosts() {
        
        try {
            // const postsFound = await axios.get("https://linkr-api-hhbp.onrender.com/posts")
            const postsFound = await axios.get("http://localhost:4000/posts");
            setPosts(postsFound.data)
            setLoading(false)
        } catch {
            alert("An error occured while trying to fetch the posts, please refresh the page")
        }
        
    }

    async function publish(e) {
        e.preventDefault()

        setIsPublishing(true);

        const postInfo = {
            user_id: 9,
            url: e.target.url.value,
            content: e.target.content.value
        }
        try {
            // await axios.post("https://linkr-api-hhbp.onrender.com/posts", postInfo)
            await axios.post("http://localhost:4000/posts", postInfo)
            setIsPublishing(false);
            e.target.url.value = "";
            e.target.content.value = "";
            renderPosts()
        } catch(err) {
            alert("Houve um erro ao publicar se link")
            setIsPublishing(false);
        }
        
    }

    return(
        <>
        <Navbar />
        <Container>
            <CentralDiv>
                <Title />
                <PublishingContainer>
                    {/* <UserPic src={userPic} alt="User picture"/> */}
                    <UserPic src="https://s1.r29static.com/bin/entry/b52/0,46,460,460/1200x1200,80/1471901/image.jpg" alt="User picture"/>
                    <Form onSubmit={publish} >
                        <FormTitle>What are you going to share today?</FormTitle>
                        <UrlInput type="url" name="url" placeholder="http://..." required disabled={isPublishing}/>
                        <ContentInput name="content" placeholder="Awesome article about #javascript" disabled={isPublishing}/>
                        <ButtonDiv>
                            <Button type="submit" disabled={isPublishing}>{isPublishing ? "Publishing..." : "Publish"}</Button>
                        </ButtonDiv>
                    </Form>
                </PublishingContainer>
                {loading ? <Loading>Loading...</Loading> : posts.length === 0 ? <NoPostsMessage>There are no posts yet</NoPostsMessage> : posts.map((p) => <Post post={p}/> )}
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
    margin-top: 58px;
`
const PublishingContainer = styled.div`
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
`

const Loading = styled.p`

    font-weight: 700;
    font-size: 24px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 75px;
`

const NoPostsMessage = styled.p`

    font-weight: 700;
    font-size: 24px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 75px;
`