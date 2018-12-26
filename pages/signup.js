import React from 'react';
import styled from 'styled-components';

import Signup from '../components/auth/Signup';
import Signin from '../components/auth/Signin';
import RequestReset from '../components/auth/RequestReset';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = () => (
  <Columns>
    <Signup />
    <Signin />
    <RequestReset />
  </Columns>
);

export default SignupPage;
