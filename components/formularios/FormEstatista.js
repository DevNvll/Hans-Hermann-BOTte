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
                  <label>Qual é a definição correta de estado?</label>
                  <Form.Field
                    control={Radio}
                    name="estatista"
                    label="Uma instituição que controla os meios de produção e de distribuição, mediante a supressão da propriedade privada e das classes sociais.."
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
                    label="Uma instituição que financia e administra apenas um número bem reduzido de coisas; coisas essenciais, que não podem ser desempenhadas pelo setor privado."
                    value="b"
                    checked={this.state.resposta === 'b'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="2"
                  />
                  <Form.Field
                    control={Radio}
                    name="estatista"
                    label="Uma instituição que aplica o liberalismo laissez-faire, defende a liberdade individual, e limita seu poder pelo império da lei."
                    value="c"
                    checked={this.state.resposta === 'c'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="3"
                  />
                  <Form.Field
                    control={Radio}
                    name="estatista"
                    label="Uma instituição em que o chefe tem o título de rei ou rainha (ou seus equivalentes)."
                    value="d"
                    checked={this.state.resposta === 'd'}
                    onChange={(e, { value }) => {
                      this.setState({ resposta: value })
                    }}
                    key="4"
                  />
                  <Form.Field
                    control={Radio}
                    name="estatista"
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
                    ? () => next(3, this.state.resposta)
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
