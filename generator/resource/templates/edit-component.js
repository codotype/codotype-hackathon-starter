import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import <%- schema.class_name %>Form from './<%- schema.class_name %>Form';

import Loader from '../components/Loader';

class <%- schema.class_name %>Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      content: undefined
    }
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    axios.get('/api/<%- schema.identifier_plural %>/' + this.props.match.params.id).then((response) => {
      this.setState({
        isLoaded: true,
        content: response.data
      })
    })
  }

  handleContentChange(identifier, value) {
    this.setState({
      content: {
        ...this.state.content,
        [identifier]: value
      }
    })
  }

  handleUpdate() {
    axios.put('/api/<%- schema.identifier_plural %>/' + this.props.match.params.id, this.state.content)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2><%- schema.label %> - Edit</h2>
          </div>
        </div>

        <hr />

        <Loader isLoaded={this.state.isLoaded}>
          <<%- schema.class_name %>Form content={this.state.content} onContentChange={this.handleContentChange} />
        </Loader>

        <div className="row">
          <div className="col-lg-12 text-right">

            <Link to="/<%- schema.identifier_plural %>" className="btn btn-outline-dark mr-2">
              <i className="fa fa-fw fa-times mr-1"></i>
              Cancel
            </Link>

            <Link to="/<%- schema.identifier_plural %>" className="btn btn-outline-success" onClick={this.handleUpdate}>
              <i className="fa fa-fw fa-plus mr-1"></i>
              Update <%- schema.label %>
            </Link>

          </div>
        </div>

      </div>
    )
  }
}

export default <%- schema.class_name %>Edit;

