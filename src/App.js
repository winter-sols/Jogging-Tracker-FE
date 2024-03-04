import { React, lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
const Login = lazy(() => import('./routes/Login'));
const Signup = lazy(() => import('./routes/Signup'));
const Header = lazy(() => import('./containers/Header'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const RecordsList = lazy(() => import('./routes/RecordsList'));
// const Profile = lazy(()=> import('./routes/Profile'));
const Users = lazy(()=> import('./routes/Users'));


function App() {
  // useEffect(()=>{
  //   setIsAuthenticated(value)
  // },[isAuthenticated])
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);

  return (
    <div className='App'>
      <BrowserRouter>
        <Container>
          <Header />
          <Suspense fallback={<div className='container'>Loading...</div>}>
            <Routes>
              <Route exact path='/' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login"/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/dashboard' element={<Dashboard />} />
              {/* <Route path='/profile' element={<Profile />} /> */}
              <Route path='/users' element={<Users />} />
              <Route path='/records' element={<RecordsList />} />
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
