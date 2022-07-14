import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DbServices from "../services/db-service"
const API_URL = DbServices.getBaseUrl();

const Home = () => {
  const [orgs, setOrgs] = useState([]);
  const [totalCount, setTotalCount] = useState('');

  useEffect(() => {
    axios.get(API_URL+"api/organizations.json").then(resp=> {
      setOrgs(resp.data.organizations);
      setTotalCount(resp.data.total_count);
    });
  }, []);
  return(
    <div>
      <h3>Home</h3>
      <span>
        <h5>Organizations</h5>
        {orgs.map((org, index) => 
          <ul key={index}>
            <li>{org.name}</li>
            <li>{org.ein}</li>
          </ul>
        )}
      </span>
    </div>
  )
}

export default Home;