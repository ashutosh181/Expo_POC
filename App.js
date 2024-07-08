import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


/* default app */


import React, { useState, useEffect } from 'react';
import './App.css';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import styled from 'styled-components';
import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const mockData = [
  { id: 1, year: '2022', state: 'FL', variant: 'SMIRNOFF', comments: 'Great product', reason: 'Quality' },
  { id: 2, year: '2021', state: 'GA', variant: 'RED VODKA', comments: 'Loved it', reason: 'Price Change' },
  { id: 3, year: '2023', state: 'MI', variant: 'CAPTAIN MORGAN', comments: 'Not bad', reason: 'Quality' },
  { id: 4, year: '2020', state: 'MA', variant: 'JOHNNIE WALKER', comments: 'Fantastic', reason: 'Quality' },
  { id: 5, year: '2019', state: 'NM', variant: 'DON JULIO', comments: 'Smooth', reason: 'Price Change' },
];

const loadInitialData = () => {
  const savedData = JSON.parse(localStorage.getItem('userComments')) || {};
  return mockData.map(item => ({
    ...item,
    comments: savedData[item.id] || item.comments,
  }));
};

function App() {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [stateFilter, setStateFilter] = useState('');
  const [variantFilter, setVariantFilter] = useState('');
  const [data, setData] = useState(loadInitialData());

  const handleStateChange = (event) => {
    setStateFilter(event.target.value);
    applyFilters(event.target.value, variantFilter);
  };

  const handleVariantChange = (event) => {
    setVariantFilter(event.target.value);
    applyFilters(stateFilter, event.target.value);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleCommentChange = (id, newComment) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, comments: newComment } : item
    );
    setData(updatedData);
    localStorage.setItem('userComments', JSON.stringify(
      updatedData.reduce((acc, item) => {
        acc[item.id] = item.comments;
        return acc;
      }, {})
    ));
  };

  const handleReasonChange = (id, newReason) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, reason: newReason } : item
    );
    setData(updatedData);
  };

  const filteredData = data.filter((item) => {
    return (
      (stateFilter === '' || item.state === stateFilter) &&
      (variantFilter === '' || item.variant === variantFilter)
    );
  });

  const applyFilters = (stateFilter, variantFilter) => {
    const filters = [];

    if (stateFilter) {
      filters.push({
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "data", // Replace with your actual table name
          column: "state"
        },
        operator: "In",
        values: [stateFilter]
      });
    }

    if (variantFilter) {
      filters.push({
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "data", // Replace with your actual table name
          column: "variant"
        },
        operator: "In",
        values: [variantFilter]
      });
    }

    if (window.report) {
      window.report.setFilters(filters).catch(error => {
        console.error("Error setting filters", error);
      });
    }
  };

  useEffect(() => {
    applyFilters(stateFilter, variantFilter);
  }, [stateFilter, variantFilter]);
  return (
    <Wrapper>
      <HeaderWrapper>
        <h2>Power BI Report Embedded in a React App</h2>
      </HeaderWrapper>
      <Content>
        <LeftPane>
          <PowerBIEmbed
            embedConfig={{
              type: 'report',
              id: '6f14e67d-a0e0-4ab2-b5fc-44b2f4085cf6',
              embedUrl: "https://app.powerbi.com/reportEmbed?reportId=6f14e67d-a0e0-4ab2-b5fc-44b2f4085cf6&groupId=46f473fc-dc97-42ea-8c93-ab44d4dd9f4d&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtQi1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWV9fQ%3d%3d",
              accessToken: 'your_access_token_here',
              tokenType: models.TokenType.Aad,
              settings: {
                panes: {
                  filters: {
                    expanded: true,
                    visible: true
                  }
                },
                background: models.BackgroundType.Transparent,
              }
            }}
            eventHandlers={new Map([
              ['loaded', function () { console.log('Report loaded'); }],
              ['rendered', function () { console.log('Report rendered'); }],
              ['error', function (event) { console.log(event.detail); }],
              ['visualClicked', () => console.log('visual clicked')],
              ['pageChanged', (event) => console.log(event)],
            ])}
            cssClassName="container"
            getEmbeddedComponent={(embeddedReport) => { window.report = embeddedReport; }}
          />
        </LeftPane>
        <RightPane>
          <Filters>
            <FormControl variant="outlined" style={{ minWidth: "20%", marginRight: '20px' }}>
              <InputLabel>State</InputLabel>
              <Select value={stateFilter} onChange={handleStateChange} label="State">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="FL">FL</MenuItem>
                <MenuItem value="GA">GA</MenuItem>
                <MenuItem value="MI">MI</MenuItem>
                <MenuItem value="MA">MA</MenuItem>
                <MenuItem value="NM">NM</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ minWidth: "10%", marginTop: '-7px', marginRight: '17px', borderRadius: '4px' }} components={['DatePicker']}>
                <DatePicker label="Basic date picker" value={value} onChange={handleDateChange} />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl variant="outlined" style={{ minWidth: "20%" }}>
              <InputLabel>Variants</InputLabel>
              <Select value={variantFilter} onChange={handleVariantChange} label="Variants">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="SMIRNOFF">SMIRNOFF</MenuItem>
                <MenuItem value="RED VODKA">RED VODKA</MenuItem>
                <MenuItem value="CAPTAIN MORGAN">CAPTAIN MORGAN</MenuItem>
                <MenuItem value="JOHNNIE WALKER">JOHNNIE WALKER</MenuItem>
                <MenuItem value="DON JULIO">DON JULIO</MenuItem>
                <MenuItem value="SEAGRAM'S">SEAGRAM'S</MenuItem>
              </Select>
            </FormControl>
          </Filters>
          <TableContainer style={{border:"2px solid grey",width:"97%"}} component={Paper}>
            <Table sx={{ '& .MuiTableCell-root': { border: '1px solid grey' } }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'lightgrey' }}>
                  <TableCell>Year</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Brand Variant</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.variant}</TableCell>
                    <TableCell>
                      <FormControl variant="outlined" style={{ minWidth: "120px" }}>
                        <InputLabel>Reason</InputLabel>
                        <Select
                          value={row.reason}
                          onChange={(e) => handleReasonChange(row.id, e.target.value)}
                          label="Reason"
                        >
                          <MenuItem value="Price Change">Price Change</MenuItem>
                          <MenuItem value="Quality">Quality</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.comments}
                        onChange={(e) => handleCommentChange(row.id, e.target.value)}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </RightPane>
      </Content>
    </Wrapper>
  );
}

export default App;
const Wrapper = styled.div`
  text-align: center;
  padding-top: 10px;
  width: 99.5vw;
`;

const HeaderWrapper = styled.header`
  background: linear-gradient(90deg, black 0%, black 100%);
  color: white;
  border:1px solid white;
  border-radius: 5px;
  width: 98.3vw;
  margin-bottom:-10px;
  margin-left:7px;
  padding: 30px 0;
 font-family: 'Arial', sans-serif;
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }
`;



const Content = styled.div`
  display: flex;
  border:0px solid black;
  margin:10px;
  height: calc(100vh - 100px);
`;

const LeftPane = styled.div`
  flex: 1;
  left:10px;
  background: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
`;

const RightPane = styled.div`
justify-content:centre;
margin-top:8.4vh;
margin-bottom:8.4vh;
border:2px solid black;
border-radius:4px;  
flex: 1;
background: white;
 padding-top:20px;
 padding-left:20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  
`;

const Filters = styled.div`
  display: flex;
 
  
  margin-bottom: 50px;
`;
