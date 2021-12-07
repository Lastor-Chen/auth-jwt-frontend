import { Route, Routes, Navigate } from 'react-router-dom'
import Signin from './views/Signin'

function App() {
  return (
    <div className="App">
      <nav className="text-center mb-5">navBar</nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
