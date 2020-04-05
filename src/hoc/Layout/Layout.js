import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        isSideDrawerVisible: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({isSideDrawerVisible: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return { isSideDrawerVisible: !prevState.isSideDrawerVisible};
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.isSideDrawerVisible}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;