import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
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

// filing show page

const FilingShow = () => {
  const [filing, setFiling] = useState([]);
  const [org, setOrg] = useState([]);
  const [awards, setAwards] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [filingId, setFilingId] = useState('');
  useEffect(() => {
    let filingId = window.location.pathname.split('/').pop();
    setFilingId(filingId);
    let orgId = window.location.search.split('=').pop();
    setOrgId(orgId);
    axios.get(API_URL+'api/organizations/'+orgId+'/filings/'+filingId+'.json').then(resp=>{
      setFiling(resp.data);
      setOrg(resp.data.organization);
    });
    axios.get(API_URL+'api/organizations/'+orgId+'/filings/'+filingId+'/awards.json').then(resp=>{
      setAwards(resp.data.awards);
    });
  }, []);
  return(
    <div><br/>
      <Grid container direction='row' justifyContent='left' alignItems='center'>
        <Card sx={{width: '25%', height: 280, overflow: 'auto'}} variant="outlined">
          <Typography variant='h4'>Filing ID {filing.id}</Typography>
          <List>
            <ListItem>Tax Period - {filing.tax_period}</ListItem>
            <ListItem>XML URL - {filing.xml_url}</ListItem>
            <ListItem>Awards Count - {filing.awards_count}</ListItem>
            <ListItem>Toatl Amount Given - {filing.total_amount_given}</ListItem>
          </List>
        <Typography variant='h4'>Organization</Typography>
        <List>
          <ListItem>{org.name}</ListItem>
          <ListItem>EIN - {org.ein}</ListItem>
        </List>
      </Card>
    </Grid>
    <TableContainer>
            <Typography variant='h5'>Awards</Typography>
            <Table sx={{width: '100%'}} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Link</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>IRS Section</TableCell>
                  <TableCell>Cash Amount</TableCell>
                  <TableCell>Non Cash Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {awards.map((award, index) => 
                  <TableRow key={index}>
                    <TableCell><Link to={"/awards/"+award.id+"?org_id="+orgId+"&filing_id="+award.filing_id+".json"}>Link to Award {award.id}</Link></TableCell>
                    <TableCell>{award.purpose}</TableCell>
                    <TableCell>{award.irs_section}</TableCell>
                    <TableCell>{award.cash_amount}</TableCell>
                    <TableCell>{award.non_cash_amount}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
  </div>
  )

}

export default FilingShow;