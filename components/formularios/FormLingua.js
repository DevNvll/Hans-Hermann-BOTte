import React from 'react'
import FormContext from '../FormContext'
import { Button, Form, Radio, Checkbox, Dropdown, Popup } from 'semantic-ui-react'

export default class EstadosForm extends React.Component {
  constructor() {
    super()
    this.state = {
      resposta: ''
    }
  }
  render() {
    return (
      <FormContext.Consumer>
        {({ next }) => {
          return (
            <React.Fragment>
              <Form.Group>
                <Form.Field>
                  <label>
                    Você entende/fala português? / Do you understand/speak
                    brazilian portuguese?
                  </label>
                  <Form.Field
                    control={Radio}
                    name="lingua"
                    label="Sim"
                    value="a"
                    checked={this.state.resposta === 'a'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="1"
                  />
                  <Popup
                    trigger={
                      <Form.Field
                        control={Radio}
                        name="lingua"
                        label="Não"
                        value="b"
                        checked={this.state.resposta === 'b'}
                        onChange={(e, { value }) => {
                          this.setState({ resposta: value })
                        }}
                        key="2"
                      />
                    }
                    content="Send a message to the server staff for us to applicate your tags in a adequate way."
                    position="right center"
                  />
                </Form.Field>
              </Form.Group>
              <Button
                primary
                fluid
                onClick={
                  this.state.resposta
                    ? () => next(1, this.state.resposta)
                    : null
                }
              >
                Próximo
              </Button>
            </React.Fragment>
          )
        }}
      </FormContext.Consumer>
    )
  }
}
