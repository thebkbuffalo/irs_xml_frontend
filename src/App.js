import React, { Fragment } from 'react';
import {BrowserRouter, Route, Routes, Navigate, useParams, NavLink} from 'react-router-dom';
import Home from "./components/HomeContainer";
import Organization from "./components/OrganizationContainer";
import Filing from "./components/FilingContainer";
import Award from "./components/AwardContainer";
import OrganizationShow from './components/OrganizationShowContainer';
import FilingShow from './components/FilingShowContainer';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import styles from "./custom-style.css";

const App = () => {
  return(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar></NavBar>
        <Fragment>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/organizations" element={<Organization/>}/>
            <Route exact path="/organizations/:id" element={<OrganizationShow/>}/>
            <Route exact path="/filings/:id" element={<FilingShow/>}/>
            <Route exact path="/awards" element={<Award/>}/>
          </Routes>
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;

function NavBar(){
  return(
    <div className='navBar'>
      <NavLink to="/">Home</NavLink>| 
      <NavLink to="/organizations">Organizations</NavLink>
      {/* <NavLink to="/filings">Filings</NavLink>| 
      <NavLink to="/awards">Awards</NavLink> */}
    </div>
  )
}