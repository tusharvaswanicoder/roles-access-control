# roles-access-control

This library contains Context, HOC and hooks for roles and access based control over components and routes.

## Installation

This package can be installed as following:

```
npm i roles-access-control

```

> This package also depends on `react`. Please make sure you have it installed as well. Also if you need to control routes you also need `react-router-dom` installed.

## Usage

Example of basic usage for component control:

```JSX
import { useEffect, useState } from "react";
import "./App.css";
import {
    ComponentAccess,
    RolesAccessControlContextProvider
} from "roles-access-control";

function App() {
    return (
        <RolesAccessControlContextProvider
            currentUserRole="admin"
            rolesAccesses={{
                user: ["read", "write"],
                admin: ["read", "write", "delete"],
            }}
        >
            <ComponentAccess
                allowedRoles={["user", "admin"]}
                permissionsRequired="delete"
                fallbackComponent={<>Error</>}
            >
                Hello
            </ComponentAccess>
        </RolesAccessControlContextProvider>
    );
}

export default App;
```

Here you can see that we wrap the app with the [RolesAccessControlContextProvider](#RBACProvider) and pass currentUserRole as **admin** and also to the **rolesAccesses** we passed an object with mappings of access to each types of roles. And now **ComponentAccess** would show the children if permissions are satisfied otherwise it would show **fallbackComponent**. This is a basic example and we can have much more flexibility with the components and hooks.

## RolesAccessControlContextProvider

When using any of the components and hooks we have to wrap our app into this provider.

**Props to pass**

**currentUserRole(required)**

> string

**rolesAccesses(required)**

> object

The **rolesAccesses** object should have each role as key and those roles should have an array of strings as a value. The array of strings we give as value is the accesses allowed to that role.

## ComponentAccess

We can use this component to render a component if access is permitted otherwise render fallback component.

**Props to pass**

**allowedRoles(required)**

> string array

It would have all the roles which are allowed to access it.

**permissionsRequired(required)**

> object

This one is interesting because we have 2 options here if we want to only check for 1 permission then we can directly pass that as string. Otherwise we have **or** and **and** function for conditional checking. We would discuss about them later.

**fallbackComponent**

> ReactNode

This component would be rendered if permission is not available.

For example,

```jsx
<ComponentAccess
    allowedRoles={["user", "admin"]}
    permissionsRequired="delete"
    fallbackComponent={<>Error</>}
>
    Hello
</ComponentAccess>
```

Here `Hello` would be rendered if you have either `user` or `admin` role and `delete` permission is there inside that role. Otherwise if this is not true then `Error` would be rendered.

## RouteAccess

We can use this component to show some fallback component if access to a page is not allowed or redirect to some other page. It would show the child component if access is allowed.

**Props to pass**

**allowedRoles(required)**

> string array

It would have all the roles which are allowed to access the page.

**redirectTo**

> string

We can pass a url to this and if permission is not available we would be redirected to that URL.

**fallbackComponent**

> ReactNode

This component would be rendered if permission is not available.

If you have given **fallbackComponent** than it would be rendered but if you have given both **fallbackComponent** and **redirectTo** than you would be redirected to route given in **redirectTo**.

For example,

```jsx
<Routes>
    <Route
        path="/a"
        element={
            <RouteAccess allowedRoles={["user"]} redirectTo="/b">
                a
            </RouteAccess>
        }
    />
    <Route
        path="/b"
        element={
            <RouteAccess
                allowedRoles={["admin"]}
                fallBackComponent={<>Not Accessible</>}
            >
                b
            </RouteAccess>
        }
    />
</Routes>
```

## useComponentAccess

This hook is an alternative to **ComponentAccess**.

**Parameters to pass**

This hook accepts an object as parameter. In that object you have to pass **allowedRoles** and **permissionsRequired**. In the same way you did in **ComponentAccess**.

**What it returns?**

It returns an array and if you destructure that the first property is **isLoading** and second is **isPermissionsValid** both are booleans value. **isPermissionValid** tells if access is allowed are not. Based on that you can render the original or fallback component.

For example,

```jsx
const [isLoading, isPermissionsValid] = useComponentAccess({
    allowedRoles: ["user", "admin"],
    permissionsRequired: "write",
});
```

## Functions - `or` and `and`

These two functions can be used to pass **permissionsRequired** which we have to pass in **ComponentAccess** component or **useComponentAccess** whichever you use. These functions are just like `||` and `&&` operators.
<br>Some exmaples,

```jsx
or("read", "write");
```

means if we have either read or write permission.<br>

```jsx
and("read", "write");
```

means if we have both read and write permission.<br>

We can even nest the `or` and `and` functions.

```jsx
or("read", and("write", "delete"));
```

means if we have read permission then that's okay but if we dont have that we must have write as well as delete permission.<br>

## License

MIT
