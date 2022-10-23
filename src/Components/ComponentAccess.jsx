import useComponentAccess from "../useComponentAccess.jsx";

const ComponentAccess = ({
    children,
    fallbackComponent,
    allowedRoles = [],
    permissionsRequired,
}) => {
    const [isLoading, isPermissionsValid] = useComponentAccess({
        allowedRoles,
        permissionsRequired,
    });
    if (isLoading) return null;
    return isPermissionsValid ? children : fallbackComponent;
};

export default ComponentAccess;
