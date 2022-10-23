import { useCallback, useContext, useEffect, useState } from "react";
import { RolesAccessControlContext } from "./Context/RolesAccessControlContextProvider.jsx";

const useComponentAccess = ({ allowedRoles, permissionsRequired }) => {
    const [currentUserRole, rolesAccesses] = useContext(
        RolesAccessControlContext
    );
    const [isLoading, setIsLoading] = useState(true);
    const [isPermissionsValid, setIsPermissionsValid] = useState(null);
    const validatePermission = useCallback(() => {
        if (!allowedRoles.includes(currentUserRole)) return false;
        const resolvePermissions = (permissionsObject) => {
            if (permissionsObject.type === "and") {
                for (let i of permissionsObject.permissions) {
                    if (typeof i === "object") {
                        return resolvePermissions(i);
                    }
                    if (!rolesAccesses[currentUserRole].includes(i))
                        return false;
                }
                return true;
            } else {
                for (let i of permissionsObject.permissions) {
                    if (typeof i === "object") {
                        return resolvePermissions(i);
                    }
                    if (rolesAccesses[currentUserRole].includes(i)) return true;
                }
                return false;
            }
        };
        if (typeof permissionsRequired === "string")
            return rolesAccesses[currentUserRole].includes(permissionsRequired);
        else return resolvePermissions(permissionsRequired);
    }, [currentUserRole, rolesAccesses, allowedRoles, permissionsRequired]);
    useEffect(() => {
        setIsPermissionsValid(validatePermission());
        setIsLoading(false);
    }, [currentUserRole, rolesAccesses, validatePermission]);
    return [isLoading, isPermissionsValid];
};

export default useComponentAccess;
