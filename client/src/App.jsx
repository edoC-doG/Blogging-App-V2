import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signup" element={<h1>Sign up Page</h1>} />
        <Route path="signin" element={<h1>Sign in Page</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
