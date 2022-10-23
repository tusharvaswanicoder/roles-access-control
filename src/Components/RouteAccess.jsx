import { useContext, useEffect } from "react";
import { RolesAccessControlContext } from "../Context/RolesAccessControlContextProvider.jsx";
import { useNavigate } from "react-router-dom";

const RouteAccess = ({
    children,
    fallbackComponent,
    redirectTo,
    allowedRoles = [],
}) => {
    const [currentUserRole] = useContext(RolesAccessControlContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (redirectTo && !allowedRoles.includes(currentUserRole))
            navigate(redirectTo);
    }, [redirectTo, navigate, allowedRoles, currentUserRole]);
    return allowedRoles.includes(currentUserRole)
        ? children
        : fallbackComponent;
};

export default RouteAccess;
