import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import <%- schema.class_name %>ListWidget from './<%- schema.class_name %>ListWidget';


class <%- schema.class_name %>List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collection: [],
      loaded: false
    }
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.updateCollection();
  }

  updateCollection() {
    this.setState({ loaded: false })
    axios.get('/api/<%- schema.identifier_plural %>')
      .then((response) => {
        this.setState({
          collection: response.data,
          loaded: true
        })
      })
  }

  deleteItem(id) {
    axios.delete('/api/<%- schema.identifier_plural %>/' + id)
      .then(() => {
        this.updateCollection();
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h2>
              <%= schema.label_plural %>
            </h2>
          </div>

          <div className="col-md-4 text-right">
            <Link className="btn btn-outline-success" to="/<%- schema.identifier_plural %>/new">
              <i className="fa fa-fw fa-plus mr-2"></i>
              New <%- schema.label %>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <<%- schema.class_name %>ListWidget collection={this.state.collection} isLoaded={this.state.loaded} />
          </div>
        </div>
      </div>
    )
  }
}

export default <%- schema.class_name %>List;
