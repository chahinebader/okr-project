import React from 'react';

export default React.createContext({
    status: null,
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});