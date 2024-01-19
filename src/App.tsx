import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import WaitingArea from './pages/waitingarea/WaitingArea';


function App() {

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<WaitingArea />} />
           
         
        </Routes>
      </div>
    </Router>
  )
}

export default App
