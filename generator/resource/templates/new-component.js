import React, { Component } from 'react';
import <%- schema.class_name %>Form from './<%- schema.class_name %>Form';
import axios from 'axios';

class <%- schema.class_name %>New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: {
        label: ''
      }
    }
  }

  // TODO - move this out of componentDidMount and into
  // a separate function that's invoked when the Editor component's submit button is clicked
  // componentDidMount() {
  //   axios.post('/api/<%- schema.identifier_plural %>').then((response) => {
  //     this.setState({
  //       content: JSON.stringify(response)
  //     })
  //   })
  // }

  render() {
    return (
      <div class='container'>
        <h2>New component</h2>
        <<%- schema.class_name %>Form id={999} content={this.state.content} />
      </div>
    )
  }
}

export default <%- schema.class_name %>New;

