import { Routes, Route } from 'react-router-dom';
import SigninPage from './views/Signin';
import Dashboard from './views/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
      <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route path='/signin' element={<SigninPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App