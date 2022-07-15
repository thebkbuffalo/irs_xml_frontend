import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import DbServices from "../services/db-service";
const API_URL = DbServices.getBaseUrl();

const Award = () => {
  const [award, setAward] = useState([]);
  const [receiver, setReceiver] = useState([]);
  useEffect(()=>{
    let awardId = window.location.pathname.split('/').pop();
    let paramsString = window.location.search.split('.')[0].replace('?', '');
    let params = new URLSearchParams(paramsString);
    let orgId = params.get('org_id');
    let filingId = params.get('filing_id');
    axios.get(API_URL+'api/organizations/'+orgId+'/filings/'+filingId+'/awards/'+awardId+'.json').then(resp=>{
      setAward(resp.data);
      setReceiver(resp.data.receiver);
    });
  }, []);
  return(
    <div><br/>
      <Grid container direction='row' justifyContent='left' alignItems='center'>
        <Card sx={{width: '25%', height: 280, overflow: 'auto'}} variant="outlined">
          <Typography variant='h5'>Award ID {award.id}</Typography>
          <List>
            <ListItem>Filer Name - {award.filer_org_name}</ListItem>
            <ListItem>Purpose - {award.purpose}</ListItem>
            <ListItem>Amount - {award.cash_amount}</ListItem>
            <ListItem>IRS Section - {award.irs_section}</ListItem> 
          </List>
          <Typography variant='h5'>Receiver</Typography>
          <List>
            <ListItem>Name - {receiver.name}</ListItem>
            <ListItem>EIN - {receiver.ein}</ListItem>
          </List>
        </Card>
      </Grid>
    </div>
  )
}

export default Award;