import styled from 'styled-components';

export const Logo = styled.h1`
  width: 100%;
  margin: 0 0.7em;
  font-size: 4rem;
  position: relative;
  z-index: 2;
  transform: skew(-20deg);

  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin-left: 0.5em;
    width: 90%;
    text-align: center;
  }

  @media (max-width: 450px) {
    margin: 0;
    width: 100%;
    transform: skew(0deg);
  }
`;

export const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;
