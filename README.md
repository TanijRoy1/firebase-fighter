# Firebase Fighter

## 🚀 Live Demo
🔗 [View Deployed App](https://firebase-fighter-concentual-9.netlify.app/)

## 🧰 Features

### 1. MyLink

### 2. MyContainer

### 3. AuthContext and AuthProvider

### 4. to get user set a observer

### 5. toggle signIn / signUp

### 6. show password

### 7. toggle user and logIn

### 8. google SignIn

### 9. test the general expression of password

### 10. PrivateRoutes -- pathname, state, Navigate, useNavigation

### 11. create .env file to hide firebase.init.js content

### 12. deploy -- go to authentication>settings>authorised domains and Add domain

##### 13. set displayName (not implemented yet)

---

## 1. MyLink:

```js
const MyLink = ({ to, className, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `border-b-2 border-blue-600 text-blue-600 ${className}`
            : `border-b-2 border-white hover:text-blue-600 ${className}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
```

## 3. AuthContext and AuthProvider
```js
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // null because {} is truthy
    const [loading, setLoading] = useState(true);

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        //clear observer on unmount
        return () => {
            unsubscribe();
        }
    },[])
    const authInfo = {
        user,
        loading,
        signUpUser,
        signInUser,
        signOutUser,
        googleSignUser,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};
```
```js
<AuthProvider>
    <RouterProvider router={router}></RouterProvider>
</AuthProvider>
```
```js
const SignIn = () => {
  const { user, signInUser, signOutUser, googleSignUser } = use(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({email, password, signUpUser});

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Sign  In successFully");
        navigate(location.state);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
};
```

## 9. test the general expression of password
```js
const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#^()\-_=+])[A-Za-z\d@$!%?&#^()\-_=+]{8,}$/;
if (!regExp.test(password)) {
  toast.error(
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
  );
  return;
}
```

## 10. PrivateRoutes -- Navigate, useNavigation, pathname, state

```js
const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <h1 className="text-center py-10 text-2xl font-bold">Loading...</h1>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to={`/signIn`}></Navigate>;
};
```
```js
const location = useLocation();
const navigate = useNavigate();

const handleSignIn = (e) => {
  signInUser(email, password)
   .then((result) => {
      console.log(result.user);
      toast.success("Sign  In successFully");
      navigate(location.state || "/");
    });
};
```

## 11. create .env file to hide firebase.init.js content
```js
// in .env file(.env must be in root file):
// VITE_apiKey=AIzaSyAuci_8DcljlHkv4w2LfQUg1anjesbS1O4

// in .gitignore type .env

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};
```

