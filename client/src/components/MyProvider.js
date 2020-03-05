import React from 'react';
import MyContext from './MyContext';

function MyProvider() {
    return (
        <MyContext.Provider
            value={{
                restaurantId: 45000,
                restaurantName: 'Cheng Restaurant',
                userID: 100
            }}
        />
    )
}

export default MyProvider
