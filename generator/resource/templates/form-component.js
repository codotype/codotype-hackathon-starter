import React, { Component } from 'react';

class <%- schema.class_name %>Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.content
    }
    this.getModel = this.getModel.bind(this)
    this.setModel = this.setModel.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      model: props.content
    })
  }

  getModel(identifier) {
    return this.state.model[identifier];
  }

  setModel(identifier, newValue) {
    this.state.model[identifier] = newValue
    this.setState('model', this.state.model);
  }

  render() {
    return (
      <div className='row'>
        <%_ for (let attr of schema.attributes) { _%>
        <div className="col-lg-6">
          <div className="form-group">
            <label className='mb-0'>
              <%= attr.label %>
              <%_ if (attr.required) { _%>
              <span className='text-danger'>*</span>
              <%_ } _%>
            </label>
            <small className="form-text text-muted mb-2"><%= attr.help %></small>
          <%_ if (attr.datatype === 'BOOL') { _%>
            <input
              type="checkbox"
              className="form-control"
              checked={Boolean(this.getModel('<%- attr.identifier %>'))}
              onChange={(e) => this.setModel('<%- attr.identifier %>', e.target.checked)}
            />
          <%_ } else if (attr.datatype === 'TEXT') { _%>
            <input
              type="text"
              className="form-control"
              placeholder="<%= attr.label %>"
              value={String(this.getModel('<%= attr.identifier %>'))}
              onChange={(e) => this.setModel('<%= attr.identifier %>', e.target.value)}
            />
          <%_ } else if (attr.datatype === 'NUMBER') { _%>
            <input type="number" className="form-control" placeholder="<%= attr.label %>" value={String(this.getModel('<%= attr.identifier %>'))} onChange={(e) => this.setModel('<%= attr.identifier %>', e.target.value)} />
          <%_ } else if (attr.datatype === 'DATE') { _%>
            <input type="date" className="form-control" placeholder="<%= attr.label %>" value={String(this.getModel('<%= attr.identifier %>')).split('Z')[0]} onChange={(e) => this.setModel('<%= attr.identifier %>', e.target.value + 'Z')} />
          <%_ } else if (attr.datatype === 'TIME') { _%>
            <input type="time" className="form-control" placeholder="<%= attr.label %>" value={String(this.getModel('<%= attr.identifier %>')).split('Z')[0]} onChange={(e) => this.setModel('<%= attr.identifier %>', e.target.value + 'Z')} />
          <%_ } else if (attr.datatype === 'DATETIME') { _%>
            <input type="datetime-local" className="form-control" placeholder="<%= attr.label %>" value={String(this.getModel('<%= attr.identifier %>')).split('Z')[0]} onChange={(e) => this.setModel('<%= attr.identifier %>', e.target.value + 'Z')} />
          <%_ } else if (attr.datatype === 'JSON') { _%>
            <textarea className="form-control" placeholder="<%= attr.label %>" onChange={(e) => this.setModel('<%= attr.identifier %>', JSON.parse(e.target.value))}>{ JSON.stringify(this.getModel('<%- attr.identifier %>'), null, 2) }</textarea>
          <%_ } _%>
          </div>
        </div>

      <%_ } _%>
      </div>
    )
  }
}

export default <%- schema.class_name %>Form;
