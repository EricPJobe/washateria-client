import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import TaskIcon from '@mui/icons-material/Task';
import { Link as RouterLink } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="washers">
      <ListItemIcon>
        <LocalLaundryServiceIcon />
      </ListItemIcon>
      <ListItemText primary="Washers" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="dryers">
      <ListItemIcon>
        <HeatPumpIcon />
      </ListItemIcon>
      <ListItemText primary="Dryers" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="vendingmachines">
      <ListItemIcon>
        <CoffeeMakerIcon />
      </ListItemIcon>
      <ListItemText primary="Vending Machines" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="tasks">
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItemButton>
  </React.Fragment>
);