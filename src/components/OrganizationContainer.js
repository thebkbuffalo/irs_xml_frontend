import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DbServices from "../services/db-service";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
const API_URL = DbServices.getBaseUrl();

const Organization = () => {
  const [receiverOrgs, setReceiverOrgs] = useState([]);
  const [filerOrgs, setFilerOrgs] = useState([]);
  useEffect(()=>{
    axios.get(API_URL+'api/organizations.json').then(resp=>{
      setReceiverOrgs(resp.data.organizations);
      setFilerOrgs(resp.data.filer_organizations);
    });
  }, []);
  return(
    <div id='organizationsBox'>
      <Typography variant='h4'>Organizations</Typography>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Card sx={{width: '30%', height: 700, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Filer Organizations</Typography>
          <TableContainer>
            <Table sx={{width: '100%'}} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>EIN</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filerOrgs.map((org, index) => 
                  <TableRow key={index}>
                    <TableCell><Link to={"/organizations/"+org.id}>{org.name}</Link></TableCell>
                    <TableCell>{org.ein}</TableCell>
                    <TableCell>{org.is_filer}</TableCell>
                    <TableCell>{org.is_receiver}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card sx={{width: '30%', height: 700, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Receiver Organizations</Typography>
          <TableContainer>
            <Table sx={{width: '100%'}} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>EIN</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receiverOrgs.map((org, index) => 
                  <TableRow key={index}>
                    <TableCell><Link to={"/organizations/"+org.id}>{org.name}</Link></TableCell>
                    <TableCell>{org.ein}</TableCell>
                    <TableCell>{org.is_filer}</TableCell>
                    <TableCell>{org.is_receiver}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </div>
  )
}

export default Organization;
