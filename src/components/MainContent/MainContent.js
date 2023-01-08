import styled from 'styled-components';

const MainContent = styled.div`
    width: 611px;
    height: auto;
    margin-top: 58px;

    @media (max-width: 950px) {
            margin-top: 90px;
        }

    @media (max-width: 634px) {
          width: 98vw;
  }
`;

export default MainContent;