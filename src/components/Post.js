import styled from "styled-components";

export default function Post({post}) {
    console.log(post)
    return(
        <Container>
            {/* <UserPic src={userPic} alt="User picture"/> */}
            <UserPic src="https://s1.r29static.com/bin/entry/b52/0,46,460,460/1200x1200,80/1471901/image.jpg" alt="User picture"/>
                    <PostContent>
                        <Username>{post.user_name}</Username>
                        <Description>{post.content}</Description>
                        <PostUrl>{post.url}</PostUrl>
                    </PostContent>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 276px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 18px;
    margin-bottom: 16px;
`

const UserPic = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    
`
const PostContent = styled.div`
    width: 503px;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: black; */
    margin-top: 5px;
`
const Username = styled.h2`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 19px;
    color: #FFFFFF;
    margin-bottom: 10px;
`
const Description = styled.p`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    color: #B7B7B7;
`

const PostUrl = styled.p`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    color: #B7B7B7;
`