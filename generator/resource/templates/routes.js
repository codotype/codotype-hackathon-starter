import React from 'react'
import { Route, Switch } from 'react-router-dom'

import <%- schema.class_name %>List from './<%- schema.class_name %>List'
import <%- schema.class_name %>New from './<%- schema.class_name %>New'
import <%- schema.class_name %>Show from './<%- schema.class_name %>Show'
import <%- schema.class_name %>Edit from './<%- schema.class_name %>Edit'

const routes = ({match}) => (
  <Switch>
    <Route exact path={match.url} component={<%- schema.class_name %>List} />
    <Route exact path={match.url + '/new'} component={<%- schema.class_name %>New} />
    <Route exact path={match.url + '/:id'} component={<%- schema.class_name %>Show} />
    <Route exact path={match.url + '/:id/edit'} component={<%- schema.class_name %>Edit} />
  </Switch>
)

export default routes

