import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleTask from './pages/SingleTask';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './core/components/Navbar';
import AddTask from './pages/AddTask';

function App() {
  return (
    <>
      {/*  
       TODO: Include loader
      
        TODO: Include toaster
      */}

      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/new" element={<AddTask />} />
              <Route path="/:id" element={<SingleTask />} />
              <Route path="/*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
