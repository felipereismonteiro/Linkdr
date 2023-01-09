import styled from 'styled-components';
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import { TokenContext } from "../../contexts/TokenContext.js";
import api from '../../services/api.js';


export function PublishingForm({renderPosts}) {
    const {user} = useContext(UserContext);
    const {token} = useContext(TokenContext); 
    const [isPublishing, setIsPublishing] = useState(false);

    async function publish(e) {
        e.preventDefault()

        setIsPublishing(true);

        const postInfo = {
            url: e.target.url.value,
            content: e.target.content.value
        }

        try {
            await api.publishForm(postInfo, token);
            await renderPosts()
            setIsPublishing(false);
            e.target.url.value = "";
            e.target.content.value = "";
        } catch(err) {
            console.log(err.response.data)
            alert("Houve um erro ao publicar se link")
            setIsPublishing(false);
        }
        
    }

    return(
            <PublishingContainer>
                <UserPic src={user.profile_picture} alt="User picture"/>
                <Form onSubmit={publish} >
                    <FormTitle>What are you going to share today?</FormTitle>
                    <UrlInput type="url" name="url" placeholder="http://..." required disabled={isPublishing}/>
                    <ContentInput name="content" placeholder="Awesome article about #javascript" disabled={isPublishing}/>
                    <ButtonDiv>
                        <Button type="submit" disabled={isPublishing}>{isPublishing ? "Publishing..." : "Publish"}</Button>
                    </ButtonDiv>
                </Form>
            </PublishingContainer>
    )
}
                

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
    @media (max-width: 634px) {
          width: 98vw;
    }
`
const UserPic = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    @media (max-width: 634px) {
          display: none;
    }
`
const Form = styled.form`
    width: 503px;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 5px;
    @media (max-width: 634px) {
          width: 95%;
  }
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
    
    &:hover {
        filter: brightness(0.95)
    }
`
