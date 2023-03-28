import './App.css';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
// import Pagination from './Components/Pagination';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Favourites from './Components/Favourites';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={
        <>
        <Banner/>
        <Movies/>
        
        </>
        }></Route>
        
        <Route path="/favourites"
         element={<Favourites/>}>
        </Route>
      </Routes>
      {/* navbar */}
      {/* banner */}
      {/* movies */}
      {/* pagination */}
    </BrowserRouter>
  );
}

export default App;
