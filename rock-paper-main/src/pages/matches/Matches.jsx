import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { errorToast } from '../../utils/toast';

const Matches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setCurrentUser(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    api.get('/matches').then((res) => {
      setMatches(res.data.data);
    });
  }, []);
  return (
    <div
      style={{
        height: '100%',
        padding: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3>All Matches</h3>
      <Grid container spacing={'1em'}>
        {matches.map((item, index) => (
          <Grid item xs={3}>
            <div
              style={{
                background: 'white',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                borderRadius: '7px',
                justifyContent: 'space-between',
              }}
            >
              <b>Match {index + 1}</b>
              {item.user1.id.toString().match(currentUser?._id) ? (
                <Button
                  onClick={() => {
                    navigate(`/matches/${item._id}/play`);
                  }}
                >
                  View
                </Button>
              ) : !item.user2 ? (
                <Button
                  onClick={() => {
                    api
                      .post(`/matches/${item._id}`, currentUser)
                      .then((res) => {
                        navigate(`/matches/${item._id}/play`);
                      })
                      .catch((err) => {
                        errorToast(err?.response?.data?.message);
                      });
                  }}
                >
                  Join
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate(`/matches/${item._id}/play`);
                  }}
                >
                  Enter
                </Button>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Matches;
