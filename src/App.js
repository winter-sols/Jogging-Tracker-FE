import { React, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./routes/Login"));
const Signup = lazy(() => import("./routes/Signup"));
const Header = lazy(() => import("./containers/Header"));
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Records = lazy(() => import("./routes/Records"));
const Profile = lazy(() => import("./routes/Profile"));
const Users = lazy(() => import("./routes/Users"));

function App() {
  // useEffect(()=>{
  //   setIsAuthenticated(value)
  // },[isAuthenticated])
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Header />
          <Suspense fallback={<div className="container">Loading...</div>}>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/profile"
                element={
                  isAuthenticated ? <Profile /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/users"
                element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
              />
              <Route
                path="/records/*"
                element={
                  isAuthenticated ? <Records /> : <Navigate to="/login" />
                }
              />
              {/* <RecordsList /> */}
              {/* <Dashboard /> */}
              {/* <Signin /> */}
            </Routes>
          </Suspense>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
