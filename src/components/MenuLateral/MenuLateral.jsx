import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import MenuIcon from '@material-ui/icons/Menu';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SectionContext from '../../hooks/SectionContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  header: {
    fontSize: `min(3vw, 22px)`,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MenuLateral(props) {
  const [temPermissoes, setTemPermissoes] = useContext(SectionContext);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const dadosMenu = [
    { texto: 'Entrar', url: '/login', icon: <VpnKeyIcon /> },
    { texto: 'Veículos', url: '/veiculos', icon: <DriveEtaIcon /> },
    { texto: 'Marcas', url: '/', icon: <LocalOfferIcon /> },
  ];

  const dadosMenuLogado = [
    { texto: 'Usuários', url: '/usuarios', icon: <GroupIcon /> },
    { texto: 'Dashboard', url: '/dashboard', icon: <DashboardIcon /> },
    {
      texto: 'Sair',
      url: '/login',
      icon: <ExitToAppIcon />,
      callback: () => {
        localStorage.clear();
        setTemPermissoes(false);
      },
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Item = (item, index) => (
    <ListItem
      button
      key={index}
      onClick={() => {
        item?.callback ? item.callback() : null;
        history.push(item.url);
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.texto} />
    </ListItem>
  );

  const drawer = (
    <div>
      <List>
        {dadosMenu.map((item, index) => {
          if (item.texto === 'Entrar' && temPermissoes) {
            return null;
          }
          return Item(item, index);
        })}
      </List>
      {temPermissoes && (
        <>
          <Divider />
          <List>{dadosMenuLogado.map((item, index) => Item(item, index))}</List>
        </>
      )}
    </div>
  );

  return (
    <div className={classes.root} data-testid="menu-lateral">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            data-testid="menu-toogle"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap className={classes.header}>
            MEU CARANGO BOM
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            data-testid="drawer"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

MenuLateral.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default MenuLateral;
