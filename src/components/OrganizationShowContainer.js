import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DbServices from "../services/db-service";
const API_URL = DbServices.getBaseUrl();

const OrganizationShow = () => {
  const [org, setOrg] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [filings, setFilings] = useState([]);
  const [awards, setAwards] = useState([]);
  useEffect(()=> {
    let orgId = window.location.pathname.split('/').pop();
    axios.get(API_URL+'api/organizations/'+orgId+'.json').then(resp=>{
      setOrg(resp.data);
      setAddresses(resp.data.addresses);
      setFilings(resp.data.filings);
      setAwards(resp.data.organization_awards);
    });
  }, []);
  const isFiler = () => {
    if(org.is_filer){
      return true;
    }else{
      return false;
    }
  }
  return(
    <div className='orgShowContainer'>
      <Typography variant='h4'>Organization: {org.name}</Typography>
      {isFiler() ? (<Typography variant='h5'>Filer</Typography>) : (<Typography variant='h5'>Grant Receiver</Typography>)}

      <Typography variant='h5'></Typography>
      <Grid container direction='row' justifyContent='left' alignItems='center'>
        <Card sx={{width: '30%', height: 200, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Addresses</Typography>
          <List>
            {addresses.map((address, index)=>
              <>
                <ListItem key={index}>{address.address}</ListItem>
                <ListItem key={index}>{address.city}</ListItem>
                <ListItem key={index}>{address.state}</ListItem>
                <ListItem key={index}>{address.zip_code}</ListItem>
                <ListItem key={index}>{address.country}</ListItem>
              </>
            )}
          </List>
        </Card>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        {isFiler() ? (
          <TableContainer>
            <Typography variant='h5'>Filings</Typography>
            <Table sx={{width: '100%'}} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Tax Period</TableCell>
                  <TableCell>XML URL</TableCell>
                  <TableCell>Awards Given</TableCell>
                  <TableCell>Total Amount Given</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filings.map((filing, index) => 
                  <TableRow key={index}>
                    <TableCell>{filing.tax_period}</TableCell>
                    <TableCell>{filing.xml_url}</TableCell>
                    <TableCell>{filing.awards_count}</TableCell>
                    <TableCell>{filing.total_amount_given}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer>
            <Typography variant='h5'>Awards</Typography>
            <Table sx={{width: '100%'}} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Purpose</TableCell>
                  <TableCell>IRS Section</TableCell>
                  <TableCell>Cash Amount</TableCell>
                  <TableCell>Non Cash Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {awards.map((award, index) => 
                  <TableRow key={index}>
                    <TableCell>{award.purpose}</TableCell>
                    <TableCell>{award.irs_section}</TableCell>
                    <TableCell>{award.cash_amount}</TableCell>
                    <TableCell>{award.non_cash_amount}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </div>
  )
}

export default OrganizationShow;