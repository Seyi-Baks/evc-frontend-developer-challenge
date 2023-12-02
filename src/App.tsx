import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login';
import Dashboard from './views/Dashboard';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signin' element={<LoginPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App