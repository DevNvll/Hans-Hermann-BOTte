import React from 'react'
import FormContext from '../FormContext'
import { Button, Form, Radio, Checkbox, Dropdown } from 'semantic-ui-react'

import estados from './lista_estados'

export default class EstadosForm extends React.Component {
  constructor() {
    super()
    this.state = { estrangeiro: false, estado: null }
  }
  render() {
    return (
      <FormContext.Consumer>
        {({ next }) => {
          return (
            <React.Fragment>
              <h2>Selecione o estado que você mora</h2>
              <Form.Group widths="equal">
                <Form.Dropdown
                  placeholder="Selecione o estado..."
                  search
                  selection
                  options={estados}
                  fluid
                  onChange={(e, data) => {
                    this.setState({ estado: data.value })
                  }}
                  disabled={this.state.estrangeiro}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Checkbox
                  label="Sou estrangeiro/Não quero especificar"
                  checked={this.state.estrangeiro}
                  onChange={() => {
                    this.setState({ estrangeiro: !this.state.estrangeiro })
                  }}
                />
              </Form.Group>
              <Form.Button
                primary
                fluid
                onClick={
                  this.state.estado || this.state.estrangeiro
                    ? () => next(1, this.state)
                    : null
                }
              >
                Próximo
              </Form.Button>
            </React.Fragment>
          )
        }}
      </FormContext.Consumer>
    )
  }
}
