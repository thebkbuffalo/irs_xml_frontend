import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DbServices from "../services/db-service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
const API_URL = DbServices.getBaseUrl();

const Filing = () => {
  // const [filings, setFilings] = useState([]);
  // useEffect(()=>{
  //   axios.get(API_URL+'api/')
  // }, []);
  return(
    <div>
      <Typography variant='h4'>Filings</Typography>
    </div>
  )
}

export default Filing;