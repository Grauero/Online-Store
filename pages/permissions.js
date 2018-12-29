import React from 'react';

import PleaseSignIn from '../components/auth/PleaseSignIn';
import Permissions from '../components/permissions/Permissions';

const PermissionsPage = () => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;
