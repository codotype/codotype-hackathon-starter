import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';

class <%- schema.class_name %>ShowWidget extends Component {
  render() {
    const m = this.props.model
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-sm-8">
              <h2>
                { this.props.header || '<%- schema.label %> Detail' }
              </h2>
            </div>
            <div className="col-sm-4 text-right">
              <Link className="btn btn-outline-warning btn-sm" to={'/<%= schema.identifier_plural %>/' + m._id + '/edit'}>
                <i className="fa fa-fw fa-pencil"></i>
              </Link>

              <button className="btn btn-sm btn-outline-danger" onClick={this.deleteItem}>
                <i className="fa fa-fw fa-trash"></i>
              </button>
            </div>
          </div>
          <Loader isLoaded={this.props.isLoaded}>
            <table className="table table-striped">
              <tbody>
                <%_ for (let attr of schema.attributes) { _%>
                <%_ if (attr.datatype !== 'RELATION') { _%>
                <tr>
                  <td>
                    <%= attr.label %>
                  </td>
                  <td>
                    { String(m.<%= attr.identifier %>) }
                  </td>
                </tr>
                <%_ } _%>
                <%_ } _%>
              </tbody>
            </table>
          </Loader>
        </div>
      </div>
    )
  }
}

export default <%- schema.class_name %>ShowWidget
