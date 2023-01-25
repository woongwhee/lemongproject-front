import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function Expenses() {

    return(
        <>
        <main style={{padding:"1rem 0"}}>
            <h2>Expenses</h2>
            <Link to="/expenses/home">Home</Link>
        </main>

        {/* <BrowserRouter>
            <Routes>
                <Route path="/expense/home" element={<Home />} />
            </Routes>
        </BrowserRouter> */}

        </>


    )

}

export default Expenses;