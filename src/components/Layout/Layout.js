import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        isSideDrawerVisible: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({isSideDrawerVisible: false});
    }

    render () {
        return (
            <Aux>
                <Toolbar closed={this.sideDrawerClosedHandler} />
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