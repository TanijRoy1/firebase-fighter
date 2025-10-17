import React from 'react';

const MyContainer = ({children, className}) => {
    return (
        <div className={`px-4 ${className}`}>
            <div className="container mx-auto">{children}</div>
        </div>
    );
};

export default MyContainer;