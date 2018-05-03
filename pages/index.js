import React from 'react'
import url from 'url'
import axios from 'axios'
import {
  Image,
  Item,
  Button,
  Icon,
  Loader,
  Segment,
  Dimmer,
  Transition,
  Container
} from 'semantic-ui-react'
import {
  refreshToken,
  setToken,
  getToken,
  getInfo,
  logout,
  checkMembership,
  checkRole
} from '../utils/auth'

import Profile from '../components/Profile'
import Form from '../components/Form'

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=')
    return Object.assign(params, { [key]: decodeURIComponent(val) })
  }, {})
}

const NotMember = () => {
  return (
    <center>
      <Image src="/static/fh.png" centered size="large" />
      <br />
      <h3>Você não é membro do servidor</h3>
      <a href="https://discord.gg/XF9zuh3">
        <Button color="blue" size="massive">
          Clique aqui para entrar
        </Button>
      </a>
    </center>
  )
}

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedin: false,
      member: false,
      loading: true,
      isPending: false
    }
  }

  componentDidMount() {
    document.title = 'Fraternidade Hoppeana'
    const authurl = process.env.NOW_URL
      ? 'https://discordapp.com/api/oauth2/authorize?client_id=441321755206877196&redirect_uri=https://fraternidade-hoppeana.now.sh/callback' +
        '&response_type=code&scope=identify%20guilds'
      : 'https://discordapp.com/api/oauth2/authorize?client_id=441321755206877196&redirect_uri=http://localhost:3000/callback' +
        '&response_type=code&scope=identify%20guilds'
    this.setState({ url: authurl })
    const { code, refresh } = getUrlParams(window.location.search)
    const token = getToken()
    if (code && refresh) {
      localStorage.setItem('token', code)
      localStorage.setItem('refresh', refresh)
      this.setState({ loggedin: true })
      this.loadInfo()
      history.replaceState({}, 'Fraternidade Hoppeana - Tags', '/')
    } else if (token) {
      this.setState({ loggedin: true })
      this.loadInfo()
    } else {
      this.setState({ loading: false })
    }
  }
  loadInfo() {
    getInfo()
      .then(({ data }) => {
        this.setState({ user: data })
        document.title =
          'FH - Tags - ' + data.username + '#' + data.discriminator
        checkMembership().then(result => {
          if (result) {
            this.setState({ member: true })
            checkRole(data.id).then(pending => {
              this.setState({ isPending: pending.data })
              this.setState({ loading: false })
            })
          } else {
            this.setState({ loading: false })
          }
        })
      })
      .catch(err => console.log(err))
  }
  onLogout() {
    logout()
    this.setState({ loggedin: false })
    document.title = 'Fraternidade Hoppeana'
  }
  render() {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader inverted size="big">
            Carregando
          </Loader>
        </Dimmer>
      )
    }
    return (
      <Container>
        {(this.state.loggedin &&
          this.state.user && (
            <React.Fragment>
              <Profile
                avatar={`https://cdn.discordapp.com/avatars/${
                  this.state.user.id
                }/${this.state.user.avatar}.png`}
                username={
                  this.state.user.username + '#' + this.state.user.discriminator
                }
                onLogout={this.onLogout.bind(this)}
              />
              {(this.state.member && (
                <Form
                  userid={this.state.user.id}
                  pending={this.state.isPending}
                />
              )) || <NotMember />}
            </React.Fragment>
          )) || (
          <div className="login">
            <center>
              <Image src="/static/fh.png" size="large" />
              <h1>Fraternidade Hoppeana</h1>
            </center>
            <a href={this.state.url}>
              <Button color="blue" size="massive">
                Entrar com o Discord
              </Button>
            </a>
          </div>
        )}
        <style jsx global>
          {`
            html {
              height: 100%;
            }
            * {
              box-sizing: border-box;
            }

            body {
              display: flex;
              background-color: #f2f2f2;
              justify-content: center;
              font-family: 'Roboto', sans-serif;

              height: 100%;

              background-repeat: no-repeat;
              background-attachment: fixed;
            }
            .login {
              display: flex; /* establish flex container */
              flex-direction: column; /* make main axis vertical */
              justify-content: center; /* center items vertically, in this case */
              align-items: center; /* center items horizontally, in this case */
              height: 100vh;
            }
            .notMember {
              display: flex; /* establish flex container */
              align-items: center; /* center items horizontally, in this case */
            }
          `}
        </style>
      </Container>
    )
  }
}
