import React from 'react'
import FormContext from '../FormContext'
import { Button, Form, Radio, Checkbox, Dropdown } from 'semantic-ui-react'

import estados from './lista_estados'
import continentes from './lista_continentes'

export default class extends React.Component {
  constructor() {
    super()
    this.state = { estado: null, anon: false, continente: null }
  }
  render() {
    return (
      <FormContext.Consumer>
        {({ next, estrangeiro }) => (
          <div>
            {!estrangeiro ? (
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
                    disabled={this.state.anon}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Checkbox
                    label="Não quero especificar"
                    checked={this.state.anon}
                    onChange={() => {
                      this.setState({ anon: !this.state.anon })
                    }}
                  />
                </Form.Group>
                <Form.Button
                  primary
                  fluid
                  onClick={
                    this.state.estado || this.state.anon || this.state.continente
                      ? () => next(10, this.state)
                      : null
                  }
                >
                  Próximo
                </Form.Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2>
                  Se você mora fora do Brasil, selecione o continente onde vive.
                  / If you're not brazilian or don't live in Brazil, select the
                  continent that you live in the moment.
                </h2>
                <Form.Group widths="equal">
                  <Form.Dropdown
                    placeholder="Select a continent..."
                    search
                    selection
                    options={continentes}
                    fluid
                    onChange={(e, data) => {
                      this.setState({ continente: data.value })
                    }}
                    disabled={this.state.anon}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Checkbox
                    label="I'd rather be anonymous."
                    checked={this.state.anon}
                    onChange={() => {
                      this.setState({ anon: !this.state.anon })
                    }}
                  />
                </Form.Group>
                <Form.Button
                  primary
                  fluid
                  onClick={
                    this.state.estado || this.state.anon || this.state.continente
                      ? () => next(10, this.state)
                      : null
                  }
                >
                  Próximo
                </Form.Button>
              </React.Fragment>
            )}
          </div>
        )}
      </FormContext.Consumer>
    )
  }
}
