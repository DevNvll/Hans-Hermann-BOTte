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
import FormLocal from './formularios/FormLocal'
import Estado from './formularios/FormEstado'
import FormAnarquia from './formularios/FormAnarquia'
import FormRegras from './formularios/FormRegras'

const Steps = ({ step, next, enviar, handleChange }) => {
  switch (step) {
    case 1:
      return <FormLocal />
    case 2:
      return <Estado />
    case 3:
      return <FormAnarquia />
    case 4:
      return <FormRegras />
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
  handleNext(step, text) {
    if (step === 1) {
      if (!text.estrangeiro) {
        this.setState({ form: { ...this.state.form, 1: text.estado } })
      } else {
        this.setState({ form: { ...this.state.form, 1: null } })
      }
      this.setState({ step: this.state.step + 1 })
      return
    }
    if (step === 2 && (text === 'a' || text === 'c')) {
      this.setState({ form: { ...this.state.form, 2: text, 3: null, 4: null } })
      this.handleSubmit({ ...this.state.form, 2: text, 3: null, 4: null })
      this.setState({ sent: true })
      return
    }
    if (step === 3) {
      if (text === 'a') {
        this.setState({ form: { ...this.state.form, 3: 'a', 4: null } })
        this.handleSubmit({ ...this.state.form, 3: 'a', 4: null })
        this.setState({ sent: true })
        return
      } else if (text === 'c') {
        this.setState({ form: { ...this.state.form, 3: 'c', 4: null } })
        this.handleSubmit({ ...this.state.form, 3: 'c', 4: null })
        this.setState({ sent: true })
        return
      }
    }
    this.setState({ form: { ...this.state.form, [step]: text } })
    if (step < 4) this.setState({ step: this.state.step + 1 })
    if (step === 4) {
      this.setState({ sent: true })
      this.handleSubmit({ ...this.state.form, [step]: text })
    }
  }
  render() {
    return (
      <React.Fragment>
        {(this.props.pending && (
          <Segment style={{ margin: '50px' }} loading={this.state.loading}>
            <FormContext.Provider
              value={{
                handleChange: this.handleChange.bind(this),
                next: this.handleNext.bind(this),
                enviar: this.enviar.bind(this)
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
