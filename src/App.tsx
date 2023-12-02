import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login';
import Dashboard from './views/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route path='/signin' element={<LoginPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App