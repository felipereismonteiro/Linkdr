import styled from "styled-components";
import Navbar from "./Navbar.js";
import Post from "./Post.js";
import Title from "./Title.js";

export default function TimelinePage() {
    return(
        <>
        <Navbar />
        <Container>
            <CentralDiv>
                <Title />
                <PostDiv>
                    {/* <UserPic src={userPic} alt="User picture"/> */}
                    <UserPic src="https://s1.r29static.com/bin/entry/b52/0,46,460,460/1200x1200,80/1471901/image.jpg" alt="User picture"/>
                    <Form>
                        <FormTitle>What are you going to share today?</FormTitle>
                        <UrlInput placeholder="http://..."/>
                        <ContentInput placeholder="Awesome article about #javascript"/>
                        <ButtonDiv>
                            <Button type="submit" value="Publish" />
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
    width: 100%;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;

    &::placeholder {
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #949494;
    }
`

const ContentInput = styled.input`
     width: 100%;
    height: 66px;
    background: #EFEFEF;
    border-radius: 5px;

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
const Button = styled.input`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
`