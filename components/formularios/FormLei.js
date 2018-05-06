import React from 'react'
import FormContext from '../FormContext'
import {
  Button,
  Form,
  Radio,
  Checkbox,
  Dropdown,
  Popup
} from 'semantic-ui-react'
export default class FormLei extends React.Component {
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
                  <label>Uma lei/norma é baseada por/pela?</label>
                  <Popup
                    trigger={
                      <Form.Field
                        control={Radio}
                        name="lei"
                        label="Ética voltada para a propriedade privada."
                        value="a"
                        checked={this.state.resposta === 'a'}
                        onChange={(e, { value }) => {
                          this.setState({ resposta: value })
                        }}
                        key="1"
                      />
                    }
                    content="Caso escolha esta opção, será necessário que você derive a ética argumentativa para alguém da Staff."
                    position="right center"
                  />
                  <Form.Field
                    control={Radio}
                    name="lei"
                    label="Vontade de Deus."
                    value="b"
                    checked={this.state.resposta === 'b'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="2"
                  />
                  <Form.Field
                    control={Radio}
                    name="lei"
                    label="Experiência humana (Costumes e tradições)."
                    value="c"
                    checked={this.state.resposta === 'c'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="3"
                  />
                  <Form.Field
                    control={Radio}
                    name="lei"
                    label="Utilidade para o indivíduo e a sociedade em geral."
                    value="d"
                    checked={this.state.resposta === 'd'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="4"
                  />
                  <Form.Field
                    control={Radio}
                    name="lei"
                    label="Vida, liberdade e propriedade."
                    value="e"
                    checked={this.state.resposta === 'e'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="5"
                  />
                  <Form.Field
                    control={Radio}
                    name="lei"
                    label="Nenhuma das alternativas anteriores. / Não sei."
                    value="f"
                    checked={this.state.resposta === 'f'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="6"
                  />
                </Form.Field>
              </Form.Group>
              <Button
                primary
                fluid
                onClick={
                  this.state.resposta
                    ? () => next(6, this.state.resposta)
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
