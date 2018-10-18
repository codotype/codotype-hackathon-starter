import React, { Component } from 'react';
import axios from 'axios';

import <%- schema.class_name %>ShowWidget from './<%- schema.class_name %>ShowWidget';

class <%- schema.class_name %>Show extends Component {
  constructor(props) {
    super(props)
    this.deleteItem = this.deleteItem.bind(this)
    this.state = {
      loading: true,
      model: {}
    }
  }

  componentDidMount() {
    this.updateModel()
  }

  updateModel() {
    this.setState({ loading: true })
    axios.get('/api/<%- schema.identifier_plural %>/' + this.props.match.params.id)
    .then((response) => {
      this.setState({
        loading: false,
        model: response.data
      })
    })
  }

  deleteItem() {
    const confirm = window['confirm'] // get around the linter
    if (confirm('Delete?')) {
      axios.delete('/api/<%- schema.identifier_plural %>/' + this.props.match.params.id)
      .then((response) => {
        this.updateModel()
      })
    }
  }

  render() {
    return (
      <div className="container">
        <<%- schema.class_name %>ShowWidget model={this.state.model} isLoaded={!this.state.loaded} />
        { /*<div className="row">
          <%_ for (let relation of schema.relations) { _%>
          <div className="col-lg-12 mt-2">
            <%_ if (relation.type === 'LIST') { _%>
            <<%- relation.name %> header="<%- relation.name %>" isLoaded={true} collection="<%= relation.getter %>" />
            <%_ } else { _%>
            <<%- relation.name %> header="<%- relation.name %>" isLoaded={true} model="<%= relation.getter %>" />
            <%_ } _%>
          </div>
          <%_ } _%>
        </div> */ }
      </div>
    )
  }
}

export default <%- schema.class_name %>Show;
