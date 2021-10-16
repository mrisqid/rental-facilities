import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './pages/login'
import AdminUser from './pages/admin-user'
import Facilities from './pages/facilities'

export const RoutesNotLoggedIn = () => (
  <Switch>
    <Route component={Login} />
  </Switch>
)

export const RoutesLoggedIn = () => (
  <Switch>
    <Route path="/user" component={AdminUser} />
    <Route path="/facility" component={Facilities} />
    <Route component={AdminUser} />
  </Switch>
)