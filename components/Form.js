import React from 'react'
import {
  Button,
  Form,
  Segment,
  Radio,
  Message,
  Dimmer,
  Header,
  Icon,
  Image,
  Checkbox,
  Dropdown
} from 'semantic-ui-react'
import axios from 'axios'
import { getToken, checkRole } from '../utils/auth'

import FormContext from './FormContext'
import FormLingua from './formularios/FormLingua'
import Estado from './formularios/FormEstado'
import FormEstatista from './formularios/FormEstatista'
import FormInstituicoes from './formularios/FormInstituicoes'
import FormAnarquia from './formularios/FormAnarquia'
import FormLei from './formularios/FormLei'
import FormInclinacoes from './formularios/FormInclinacoes'
import FormLocal from './formularios/FormLocal'
import FormAborto from './formularios/FormAborto'
import FormIdade from './formularios/FormIdade'
import FormPI from './formularios/FormPI'

const Steps = ({ step, next, enviar, handleChange }) => {
  switch (step) {
    case 1:
      return <FormLingua />
    case 2:
      return <Estado />
    case 3:
      return <FormEstatista />
    case 4:
      return <FormInstituicoes />
    case 5:
      return <FormAnarquia />
    case 6:
      return <FormLei />
    case 7:
      return <FormInclinacoes />
    case 8:
      return <FormAborto />
    case 9:
      return <FormPI />
    case 10:
      return <FormLocal />
    case 11:
      return <FormIdade />
  }
}

export default class TagsForm extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {},
      error: false,
      sent: false,
      loading: false,
      estrangeiro: false,
      step: 1
    }
  }
  componentDidMount() {
    // axios({
    //   method: 'GET',
    //   url: `/userTags/${this.props.userid}`
    // }).then(({ data }) => {
    //   this.setState({ tags: data })
    //   this.setState({ loading: false })
    // })
  }
  handleSubmit(data) {
    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { data: data, token: getToken() }
    }).then(({ data }) => {
      console.log(data)
    })
  }
  handleClose() {
    location.reload()
  }
  handleNext(step, resp) {
    this.setState({ form: { ...this.state.form, [step]: resp } })
    if (step === 1) {
      // verifica se respondeu B na primeira pergunta (estrangeiro)
      if (resp === 'b') {
        this.setState({ estrangeiro: true })
        this.setState({ step: 10 }) //pula para a pergunta sobre continente
        return
      }
    }
    if (step === 2) {
      if (resp === 'b') {
        // verifica se respondeu B na primeira pergunta (ancap)
        this.setState({ step: 5 }) //pula para perguntas para ancaps
        return
      } else if (resp === 'c') {
        this.setState({ step: 8 }) //pula para perguntas complementares
        return
      }
    }
    if (step === 4) {
      this.setState({ step: 8 })
      return
    }
    if (step === 5) {
      if (resp === 'c' || resp === 'd') {
        // verifica se respondeu C ou D na pergunta de anarquia
        this.setState({ step: 7 }) //pula para pergunta 3
        return
      } else if (resp === 'e') {
        this.setState({ step: 8 }) //pula para perguntas finais
        return
      }
    }
    if(step === 6 && resp !== 'f') {
      this.setState({ step: 8 })
      return
    }
    if(step === 11) {
      this.handleSubmit({...this.state.form, [step]: resp})
      this.setState({sent: true})
    }
    if (step < 11) this.setState({ step: this.state.step + 1 })
  }
  render() {
    return (
      <React.Fragment>
        {(this.props.pending && (
          <Segment style={{ margin: '50px' }} loading={this.state.loading}>
            <FormContext.Provider
              value={{
                next: this.handleNext.bind(this),
                estrangeiro: this.state.estrangeiro
              }}
            >
              <Form>
                <Steps step={this.state.step} />
              </Form>
            </FormContext.Provider>
          </Segment>
        )) || (
          <React.Fragment>
            <center>
              <Image src="/static/fh.png" centered size="medium" />
              <h1>Você já respondeu o formulário.</h1>
              <h3>Qualquer problema, contate um administrador.</h3>
            </center>
          </React.Fragment>
        )}

        <Dimmer
          active={this.state.sent}
          onClickOutside={this.handleClose.bind(this)}
          page
        >
          <Header as="h2" icon inverted>
            <Icon name="heart" />
            Formulário enviado!
            <Header.Subheader>
              Se tiver qualquer problema, contate um administrador.
            </Header.Subheader>
          </Header>
        </Dimmer>
      </React.Fragment>
    )
  }
}
