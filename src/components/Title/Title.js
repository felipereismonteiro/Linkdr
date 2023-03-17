import styled from 'styled-components';

export default function Title({ title, showHashtag, loading }) {
  return loading ? (
    <LoadingDiv />
  ) : (
    <Header>
      {showHashtag && '#'}
      {title}
    </Header>
  );
}

const LoadingDiv = styled.div`
    width: 150px;
    height: 43px;
    margin-bottom: 43px;
    background-color: grey;
`

const Header = styled.h1`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  margin-bottom: 43px;
`;
