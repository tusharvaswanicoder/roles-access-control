export { default as ComponentAccess } from "./Components/ComponentAccess.jsx";
export { default as RouteAccess } from "./Components/RouteAccess.jsx";
export { default as useComponentAccess } from "./useComponentAccess.jsx";
export { default as RolesAccessControlContextProvider } from "./Context/RolesAccessControlContextProvider.jsx";
export { RolesAccessControlContext } from "./Context/RolesAccessControlContextProvider.jsx";

export const or = (...permissions) => {
    return {
        type: "or",
        permissions,
    };
};

export const and = (...permissions) => {
    return {
        type: "and",
        permissions,
    };
};
