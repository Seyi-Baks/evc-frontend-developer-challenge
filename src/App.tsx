import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login';
import Dashboard from './views/Dashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signin' element={<LoginPage />} /> 
      </Routes>
    </div>
  )
}

export default App