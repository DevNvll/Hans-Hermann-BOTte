import React from 'react'
import FormContext from '../FormContext'
import { Button, Form, Radio, Checkbox, Dropdown } from 'semantic-ui-react'
export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      resposta: ''
    }
  }
  render() {
    return (
      <FormContext.Consumer>
        {({ next, estrangeiro }) => {
          return (
            <React.Fragment>
              <Form.Group>
                <Form.Field>
                  <label>Você é / You are:</label>
                  <Form.Field
                    control={Radio}
                    name="idade"
                    label="Menor de 18 anos / Below 18"
                    value="a"
                    checked={this.state.resposta === 'a'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="1"
                  />
                  <Form.Field
                    control={Radio}
                    name="idade"
                    label="Maior de 18 anos / Above 18"
                    value="b"
                    checked={this.state.resposta === 'b'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="2"
                  />
                  <Form.Field
                    control={Radio}
                    name="idade"
                    label="Prefiro não responder / I'd rather not answer"
                    value="c"
                    checked={this.state.resposta === 'c'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="3"
                  />
                </Form.Field>
              </Form.Group>
              <Button
                secondary
                fluid
                onClick={
                  this.state.resposta
                    ? () => next(11, this.state.resposta)
                    : null
                }
              >
                Enviar
              </Button>
            </React.Fragment>
          )
        }}
      </FormContext.Consumer>
    )
  }
}
