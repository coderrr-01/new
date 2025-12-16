import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitleManager from './TitleManager.jsx';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleManager />} />
      </Routes>
    </Router>
  );
}
export default App;
