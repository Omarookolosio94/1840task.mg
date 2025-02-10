import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleTask from './pages/SingleTask';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      {/*  
       TODO: Include loader
      
        TODO: Include toaster
      */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SingleTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
