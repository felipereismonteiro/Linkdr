import styled from "styled-components";
import updateIcon from "../../assets/images/update.svg"
import moment from "moment";

export default function TimelineUpdateButton({newPostsCounter, setNewPostsCounter, setTimestampPostgre, renderPosts}) {
    return(
        <Button onClick={() => {
            renderPosts();
            setTimestampPostgre(moment(Date.now()).utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
            setNewPostsCounter(0);
        }}>
            <p>{newPostsCounter} new posts, load more!</p>
            <img src={updateIcon} />
        </Button>
    )
}

const Button = styled.button`
    width: 611px;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border: none;
    margin-bottom: 17px;
    cursor: pointer;

    font-family: 'Lato';
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;

    & img {
        width: 22px;
    }

    &:hover {
        filter: brightness(0.95)
    }
`