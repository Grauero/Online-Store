import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  li {
    display: inline-block;
    list-style-type: none;
  }
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme.black};
    font-weight: 800;
    @media (max-width: 700px) {
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background: ${props => props.theme.lightgrey};
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: red;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
    }
  }
  a:first-child {
    margin-left: 1em;
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    button,
    a {
      /* display: inline-block; */
      padding-left: 40%;
      width: 100%;
      text-align: center;
    }
    a:first-child {
      margin-left: 0em;
    }
    /* button:last-child {
      display: inline;
    }
    div:last-child {
      display: inline;
    } */

    a::before,
    button::before {
      content: none;
    }
  }
`;

export default NavStyles;
