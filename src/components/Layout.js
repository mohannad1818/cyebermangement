import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير
const Root = styled('div')({
  display: 'flex',
});

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerStyled = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
  },
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const ToolbarStyled = styled('div')(({ theme }) => theme.mixins.toolbar);

const Layout = ({ children }) => {
  return (
    <Root>
      <AppBarStyled position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Cybersecurity Governance
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <ToolbarStyled />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/admin-dashboard">
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/user-management">
            <ListItemText primary="User Management" />
          </ListItem>
          <ListItem button component={Link} to="/commitment">
            <ListItemText primary="Commitment" />
          </ListItem>
          <ListItem button component={Link} to="/statistics">
            <ListItemText primary="Statistics" />
          </ListItem>
          <ListItem button component={Link} to="/compliance-status">
            <ListItemText primary="Compliance Status" />
          </ListItem>
        </List>
      </DrawerStyled>
      <Content>
        <ToolbarStyled />
        {children}
      </Content>
    </Root>
  );
};

export default Layout;
