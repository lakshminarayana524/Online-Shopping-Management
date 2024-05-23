import React, { useState } from 'react';
import AuthToken from './auth';
import Cart from './cart';
import UserIdContext from './auth'

const Utilities = () => {
  const [userId, setUserId] = useState('');
  
  return (
    <UserIdContext.Provider value={setUserId}>
      <AuthToken />
    </UserIdContext.Provider>
  );
};

export default Utilities;