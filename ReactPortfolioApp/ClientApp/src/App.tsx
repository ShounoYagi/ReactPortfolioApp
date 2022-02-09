import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { ExamRegister } from './components/ExamRegister';
import { ExamScreen } from './components/ExamScreen';
import { Top } from './components/Top';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { IAppContext } from './react-app-env';

import './custom.css'

/**
 * Context作成
 */
 export const AppContext = React.createContext({} as {
  appContext: IAppContext,
  setAppContext: (action: (currentContext: IAppContext) => Partial<IAppContext>) => void
});

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Top} />
        <Route path='/ExamRegister/:id' component={ExamRegister} />
        <Route path='/ExamScreen/:id' component={ExamScreen} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
