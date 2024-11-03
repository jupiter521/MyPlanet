import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div  style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/dashboard" element ={<Dashboard/>}/>
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
         
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
