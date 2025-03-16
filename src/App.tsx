import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import {Home} from "./pages/Home";
import {ProducerDashboard} from "./pages/ProducerDashboard";
import {UserDashboard} from "./pages/UserDashboard";
import AddingProducer from "./components/AddingProducer"; 
import {ProducersEventList} from "./components/ProducersEventList";
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProducerDashboard" element={<ProducerDashboard />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/AddingProducer" element={<AddingProducer />} />  
          <Route path="/ProducersEventList" element={<ProducersEventList/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App