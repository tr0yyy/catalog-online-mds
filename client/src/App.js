import React from "react";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Create from "./components/addGrade";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/addgrade" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App;