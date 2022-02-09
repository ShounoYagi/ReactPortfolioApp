import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        {/* <Grid container>
        </Grid> */}
          {this.props.children}
      </div>
    );
  }
}