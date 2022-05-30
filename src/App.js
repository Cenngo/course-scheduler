import logo from './logo.svg';
import './App.css';
import {Courses} from "./Pages/Courses";
import {Footer} from "./Components/Footer";
import {NavBar} from "./Components/NavBar";

function App() {
  return (
    <div>
        <NavBar></NavBar>
        <div className="container mt-5 pt-5">
            <h1 className="ms-auto mb-3">Courses</h1>
            <Courses></Courses>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
