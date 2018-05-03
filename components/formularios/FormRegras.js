import React from 'react'
import FormContext from '../FormContext'
import { Button, Form, Radio, Checkbox, Dropdown } from 'semantic-ui-react'
export default class FormRegras extends React.Component {
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
                  <label>Qual a regra que determina a anarquia?</label>
                  <Form.Field
                    control={Radio}
                    name="regra"
                    label="Ética Libertária"
                    value="a"
                    checked={this.state.resposta === 'a'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="1"
                  />
                  <Form.Field
                    control={Radio}
                    name="regra"
                    label="Lei do mais forte"
                    value="b"
                    checked={this.state.resposta === 'b'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="2"
                  />
                  <Form.Field
                    control={Radio}
                    name="regra"
                    label="Qualquer uma"
                    value="c"
                    checked={this.state.resposta === 'c'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="3"
                  />
                  <Form.Field
                    control={Radio}
                    name="regra"
                    label="A que o mercado determinar"
                    value="d"
                    checked={this.state.resposta === 'd'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="4"
                  />
                  <Form.Field
                    control={Radio}
                    name="regra"
                    label="Outra/Não sei"
                    value="e"
                    checked={this.state.resposta === 'e'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="5"
                  />
                </Form.Field>
              </Form.Group>
              <Button
                secondary
                fluid
                onClick={
                  this.state.resposta
                    ? () => next(4, this.state.resposta)
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
