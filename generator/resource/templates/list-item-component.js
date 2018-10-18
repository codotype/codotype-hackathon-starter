import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class <%- schema.class_name %>ListItem extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    const confirm = window['confirm']; // get around the linter
    if (confirm('Delete?')) {
      this.props.onDeleteItem(this.props.model._id);
    }
  }

  render() {
    const m = this.props.model;
    return (
      <tr>
        <%_ for (let attr of schema.attributes) { _%>
        <%_ if (attr.unique) { _%>
        <td>
          <Link to={'/<%= schema.identifier_plural %>/' + m._id}>
            { m.<%=attr.identifier%> }
          </Link>
        </td>
        <%_ } else if (attr.datatype === 'BOOL') { _%>
        <td>
          <span>
            { m.<%- attr.identifier %> ? (
              <i className="fa fa-fw fa-check-square-o"></i>
            ) : (
              <i className="fa fa-fw fa-square-o"></i>
            ) }
          </span>
        </td>
        <%_ } else if (attr.datatype === 'HAS_MANY') { _%>
        <td>
          {{ m.<%=attr.identifier%>.length }}
        </td>
        <%_ } else { _%>
        <td>{ m.<%= attr.identifier %> }</td>
        <%_ } _%>
      <%_ } _%>
        <td className="text-right">
          <a className="btn btn-sm btn-outline-primary" href={'/<%= schema.identifier_plural %>/' + m._id}>
            <i className="fa fa-fw fa-eye"></i>
          </a>

          <a className="btn btn-sm btn-outline-warning" href={'/<%= schema.identifier_plural %>/' + m._id + '/edit'}>
            <i className="fa fa-fw fa-pencil"></i>
          </a>

          <button className="btn btn-sm btn-outline-danger" onClick={this.deleteItem}>
            <i className="fa fa-fw fa-trash"></i>
          </button>
        </td>
      </tr>
    )
  }
}

export default <%- schema.class_name %>ListItem;