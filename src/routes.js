import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from './pages/homepage'
import Form from './pages/form'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import AdminUser from './pages/admin-user'
import Facilities from './pages/facilities'
import Rental from './pages/rental'

export const RoutesNotLoggedIn = () => (
  <Switch>
    <Route path="/formulir/:id" component={Form} />
    <Route path="/login" component={Login} />
    <Route component={Homepage} />
  </Switch>
)

export const RoutesLoggedIn = () => (
  <Switch>
    <Route path="/user" component={AdminUser} />
    <Route path="/facility" component={Facilities} />
    <Route path="/rental" component={Rental} />
    <Route component={Dashboard} />
  </Switch>
)