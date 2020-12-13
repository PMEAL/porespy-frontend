import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
    const testBackend = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/users/',
            auth: {
                username: 'admin',
                password: 'porespyBackend'
            }
        }).then((response) => {
            console.log("users have been fetched!");
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <div className="title">
                PoreSpy
            </div>
            <div className="description">
                (Insert description here)
            </div>
            <Button variant="contained" color="primary" onClick={() => testBackend()}>
                Primary
            </Button>            
        </div>
    )
}

export default LandingPage;
