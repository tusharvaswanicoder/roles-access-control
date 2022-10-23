import React, { createContext } from "react";

export const RolesAccessControlContext = createContext(null);

const RolesAccessControlContextProvider = ({
    currentUserRole,
    rolesAccesses,
    children,
}) => {
    return (
        <RolesAccessControlContext.Provider
            value={[currentUserRole, rolesAccesses]}
        >
            {children}
        </RolesAccessControlContext.Provider>
    );
};

export default RolesAccessControlContextProvider;
