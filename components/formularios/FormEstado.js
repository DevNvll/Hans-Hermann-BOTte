import React from 'react'
import FormContext from '../FormContext'
import { Button, Form, Radio, Checkbox, Dropdown } from 'semantic-ui-react'
export default class EstadoLegitimo extends React.Component {
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
                  <label>O Estado é:</label>
                  <Form.Field
                    control={Radio}
                    name="estado"
                    label="Uma instituição legítima, que se for bem administrada, fará um bem imenso à sociedade."
                    value="a"
                    checked={this.state.resposta === 'a'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="1"
                  />
                  <Form.Field
                    control={Radio}
                    name="estado"
                    label="Uma instituição ilegítima, cujo objetivo é somente expoliar indivíduos pacíficos e domá-los para acharem que precisam dele para haver sociedade."
                    value="b"
                    checked={this.state.resposta === 'b'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="2"
                  />
                  <Form.Field
                    control={Radio}
                    name="estado"
                    label="Nenhuma das alternativas anteriores. / Não sei."
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
                primary
                fluid
                onClick={
                  this.state.resposta
                    ? () => next(2, this.state.resposta)
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
