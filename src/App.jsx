import React, { Suspense } from "react";
import './App.css';
import NavigationBar from './components/Navbar';
import Welcome from './components/Welcome';
import ReservationForm from './components/ReservationForm';
import Reservations from './components/Reservations';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-wrapper">
      <Suspense fallback={<h1>Loading ... </h1>}>
        <NavigationBar />
        <div className="app-container">
          <Routes>
            <Route path="/properties">
               {/* <Route index element={<Properties />} />  */}
              {/* <Route path=':id' element={<EventDetails/>}/> */}
              {/* <Route path='/events/add' element={<AddEvent/>}/> */}
              {/* <Route path='/events/update/:id' element={<UpdateEvent/>}/> */}
            </Route>
            <Route path="/reservation" element={<ReservationForm />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/" element={<Welcome />} />
            <Route path="*" element={<img src='/images/notfound.jpeg' width="100%" />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
