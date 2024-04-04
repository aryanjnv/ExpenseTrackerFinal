import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store'; 
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome'; 

import ProfileUpdate from './components/ProfileUpdate';
import ForgotPassword from './components/ForgotPassword';
import Expense from './components/Expense';
import './App.css';
const App = () => {
   
    

    return (
        <Provider store={store}> 
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/profileUpdate" element={<ProfileUpdate />} />
                        <Route path="/forgot-password" element={<ForgotPassword/>} />
                        <Route path="/expenses" element={<Expense />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
