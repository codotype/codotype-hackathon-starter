import React, { Component } from 'react';

import <%- schema.class_name %>ListItem from './<%- schema.class_name %>ListItem';

class <%- schema.class_name %>ListWidget extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <%_ for (let attr of schema.attributes) { _%>
            <%_ if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'OWNS_MANY') continue _%>
            <%_ if (attr.help) { _%>
            <th>
              <%= attr.label %>
              <i className="fa fa-fw fa-question-circle-o"></i>
              { /* TODO tooltip on bottom attr.help */ }
            </th>
            <%_ } else { _%>
            <th><%= attr.label %></th>
            <%_ } _%>
            <%_ } _%>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (this.props.collection.length === 0) ? (
              <tr className="tr-warning">
                <%_ for (index in schema.attributes) { _%>
                <%_ if (index === '0') { _%>
                <td>Empty</td>
                <%_ } else { _%>
                <td></td>
                <%_ } _%>
                <%_ } _%>
                <td></td>
              </tr>
            ) : (
              this.props.collection.map((model) => {
                return <<%- schema.class_name %>ListItem model={model} onDeleteItem={this.deleteItem} key={model._id} />
              })
            )
          }
        </tbody>
      </table>
    )
  }
}

export default <%- schema.class_name %>ListWidget

