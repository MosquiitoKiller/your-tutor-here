import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <div className="App">
            <Header/>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/registration" element={<Registration/>}/>
              {/*<Route path="/" element={<SearchTour/>}/>*/}
              {/*<Route path="/profile" element={<Profile/>}/>*/}
              {/*<Route path="/tours/:id" element={<TourDetails/>}/>*/}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;