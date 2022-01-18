import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from './pages/homepage'
import Form from './pages/form'
import Login from './pages/login'
import Register from './pages/register-user'
import Dashboard from './pages/dashboard'
import AdminUser from './pages/admin-user'
import Facilities from './pages/facilities'
import Rental from './pages/rental'
import Riwayat from './pages/riwayat-rental'
import RentalDetailAdmin from './pages/rental-detail-admin'
import RentalDetailUser from './pages/rental-detail-user'

export const RoutesNotLoggedIn = () => (
  <Switch>
    <Route path="/register" component={Register} />
    <Route component={Login} />
  </Switch>
)

export const UserRoutes = () => (
  <Switch>
    <Route path="/formulir/:id" component={Form} />
    <Route path="/riwayat-rental" component={Riwayat} />
    <Route path="/rental-detail/:id" component={RentalDetailUser} />
    <Route component={Homepage} />
  </Switch>
)

export const AdminRoutes= () => (
  <Switch>
    <Route path="/user" component={AdminUser} />
    <Route path="/facility" component={Facilities} />
    <Route path="/rental" component={Rental} />
    <Route path="/rental-detail/:id" component={RentalDetailAdmin} />
    <Route component={Dashboard} />
  </Switch>
)