import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DbServices from "../services/db-service";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
const API_URL = DbServices.getBaseUrl();

const Home = () => {
  const [orgs, setOrgs] = useState([]);
  const [filings, setFilings] = useState([]);
  const [awards, setAwards] = useState([]);
  const [totalCount, setTotalCount] = useState('');

  useEffect(() => {
    axios.get(API_URL+"api/home.json").then(resp=> {
      setOrgs(resp.data.organizations);
      setFilings(resp.data.filings);
      setAwards(resp.data.awards);
      setTotalCount(resp.data.total_count);
    });
  }, []);
  return(
    <div id="homeContainer">
      <Typography variant='h4'>Welcome To Some IRS Data!</Typography>
      <Typography variant='p'>Here we find the most recently created Organizations, Filings, and Awards.</Typography>
      <br/><br/>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Card sx={{width: '100%', maxWidth: 360, maxHeight: 500, height: 500, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Organizations</Typography>
          <div className='orgs_box'>
            <List>
              {orgs.map((org, index)=>
                <>
                  <ListItem key={index}><Link to={"/organizations/"+org.id}>{org.name}</Link></ListItem>
                  <Divider/>
                </>
              )}
            </List>
          </div>
        </Card>
        <Card sx={{width: '100%', maxWidth: 360, maxHeight: 500, height: 500, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Filings</Typography>
          <div className='filing_box'>
            <List>
              {filings.map((filing, index)=>
                <>
                  <ListItem key={index}>{filing.org_name}</ListItem>
                  <ListItem key={index}>Tax Period - {filing.tax_period}</ListItem> 
                  <ListItem key={index}>Awards Count - {filing.awards_count}</ListItem> 
                  <ListItem key={index}>Total Amount Given - {filing.total_amount_given}</ListItem>
                  <Divider/> 
                </>
              )}
            </List>
          </div>
        </Card>
        <Card sx={{width: '100%', maxWidth: 360, maxHeight: 500, height: 500, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Awards</Typography>
          <div className='awards_box'>
            <List>
              {awards.map((award, index)=>
                <>
                  <ListItem key={index}>Receiver - {award.receiver_name}</ListItem>
                  <ListItem key={index}>Amount - {award.cash_amount}</ListItem>
                  <ListItem key={index}>Purpose - {award.purpose}</ListItem>
                  <Divider/>
                </>
              )}
            </List>
          </div>
        </Card>
      </Grid>
    </div>
  )
}

export default Home;