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
        {({ next }) => {
          return (
            <React.Fragment>
              <Form.Group>
                <Form.Field>
                  <label>Você se consideraria:</label>
                  <Form.Field
                    control={Radio}
                    name="consideracao"
                    label="Individualista / Egoísta (Stirniano)"
                    value="a"
                    checked={this.state.resposta === 'a'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="1"
                  />
                  <Form.Field
                    control={Radio}
                    name="consideracao"
                    label="Mutualista (Proudoniano)"
                    value="b"
                    checked={this.state.resposta === 'b'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="2"
                  />
                  <Form.Field
                    control={Radio}
                    name="consideracao"
                    label="Comunista (Bakuniano/Kropotkiniano)"
                    value="c"
                    checked={this.state.resposta === 'c'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="3"
                  />
                  <Form.Field
                    control={Radio}
                    name="consideracao"
                    label="Tradicionalista"
                    value="d"
                    checked={this.state.resposta === 'd'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="4"
                  />
                  <Form.Field
                    control={Radio}
                    name="consideracao"
                    label="Nenhuma das alternativas anteriores. / Não sei."
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
                primary
                fluid
                onClick={
                  this.state.resposta
                    ? () => next(7, this.state.resposta)
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
