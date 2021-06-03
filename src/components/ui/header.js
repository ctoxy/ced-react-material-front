import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { List } from '@material-ui/core';

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}
const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em'
        }
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em'
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em'
        }
    },
    logoContainer: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '45px',
        color: 'white'
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        borderRadius: '0px'
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        '&:hover': {
            opacity: 1
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerIcon: {
        height: '50px',
        width: '50px'
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    drawerItemSelected: {
        '& .MuiListItemText-root': {
            opacity: 1
        }
    },
    //fait passer le logo devant la sidebar switchabledrawer
    appbar: {
        zIndex: theme.zIndex.modal + 1
    }
}));

export default function Header(props) {
    // appel de styles
    const classes = useStyles();
    //appel de theme
    const theme = useTheme();
    //appel de matche pour rendu mediaquery de tab
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    // active tabs
    const [value, setValue] = useState(0);

    // changement de tabs
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    // menu deroulant dans sur services
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setselectedIndex] = useState(0);
    // for the drawer lateral menu
    const [openDrawer, setOpenDrawer] = useState(false);

    // for ios device
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    // for the link of the menu services
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setselectedIndex(1);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuOptions = [
        { name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
        {
            name: 'Custom Software Development',
            link: '/customsoftware',
            activeIndex: 1,
            selectedIndex: 1
        },
        {
            name: 'iOS/Android App Development',
            link: '/mobileapps',
            activeIndex: 1,
            selectedIndex: 2
        },
        {
            name: 'Website Development',
            link: '/websites',
            activeIndex: 1,
            selectedIndex: 3
        }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        {
            name: 'Services',
            link: '/services',
            activeIndex: 1,
            ariaOwns: anchorEl ? 'simple-menu' : undefined,
            ariaPopup: anchorEl ? 'true' : undefined,
            mouseOver: event => handleClick(event)
        },
        { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
        { name: 'About Us', link: '/about', activeIndex: 3 },
        { name: 'Contact Us', link: '/contact', activeIndex: 4 }
    ];

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (
                            route.selectedIndex &&
                            route.selectedIndex !== selectedIndex
                        ) {
                            setselectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                case '/estimate':
                    setValue(5);
                    break;
                default:
                    break;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, menuOptions, selectedIndex, routes]);

    const tabs = (
        <React.Fragment>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                className={classes.tabContainer}
            >
                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
            </Tabs>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                component={Link}
                to="/estimate"
            >Estimate
            </Button>

            <Menu
                id="simple-menu"
                classes={{ paper: classes.menu }}
                elevation={0}
                style={{ zIndex: 1302 }}
                keepMounted
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{ root: classes.menuItem }}
                        onClick={(event) => { handleMenuItemClick(event, i); setValue(1); handleClose(); }}
                        selected={i === selectedIndex && value === 1}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}>
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {routes.map(route => (
                        <ListItem
                            divider
                            key={`${route}${route.activeIndex}`}
                            button
                            component={Link}
                            to={route.link}
                            selected={value === route.activeIndex}
                            classes={{ selected: classes.drawerItemSelected }}
                            onClick={() => {
                                setOpenDrawer(false);
                                setValue(route.activeIndex);
                            }}
                        >
                            <ListItemText className={classes.drawerItem} disableTypography>
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                    <ListItem
                        onClick={() => {
                            setOpenDrawer(false);
                            setValue(5);
                        }}
                        divider
                        button
                        component={Link}
                        classes={{ root: classes.drawerItemEstimate }}
                        to="/estimate"
                        selected={value === 5}
                    >
                        <ListItemText
                            className={value === 5 ? [classes.drawerItem, classes.drawerItemEstimate] : classes.drawerItem}
                            disableTypography>
                            Free Estimate
                    </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
                className={classes.drawerIconContainer}>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" color="primary" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)} disableRipple>
                            <img alt="compagny logo" className={classes.logo} src={logo} />
                        </Button>
                        {matches ? drawer : tabs}

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}