import React from 'react'
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

const SITE_URL = process.env.NOW_URL
  ? process.env.SITE_URL
  : 'http://localhost:3000'

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
  static async getInitialProps(ctx) {
    if (ctx.req.session.user) {
      const { req } = ctx
      const protocol = req.headers['x-forwarded-proto'] || 'http'
      const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

      const token = ctx.req.session.user.access_token
      const user = await getInfo(token)
      const membership = await checkMembership(token)
      const hasNewbie = await checkRole(user.data.id, baseUrl)

      return {
        credentials: ctx.req.session.user,
        user: user.data,
        membership,
        hasNewbie,
        loggedin: true,
        loading: false
      }
    } else {
      return {}
    }
  }

  componentDidMount() {
    document.title = 'Fraternidade Hoppeana'
    if (this.props.credentials) {
      history.replaceState({}, 'Fraternidade Hoppeana - Tags', '/')
    }
  }

  async onLogout() {
    await logout()
    document.title = 'Fraternidade Hoppeana'
  }
  render() {
    if (this.props.loading) {
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
        {(this.props.loggedin && this.props.user && (
          <React.Fragment>
            <Profile
              avatar={`https://cdn.discordapp.com/avatars/${
                this.props.user.id
              }/${this.props.user.avatar}.png`}
              username={
                this.props.user.username + '#' + this.props.user.discriminator
              }
              onLogout={this.onLogout.bind(this)}
            />
            {(this.props.membership && (
              <Form
                userid={this.props.user.id}
                pending={this.props.hasNewbie}
              />
            )) || <NotMember />}
          </React.Fragment>
        )) || (
          <div className="login">
            <center>
              <Image src="/static/fh.png" size="large" />
              <h1>Fraternidade Hoppeana</h1>
            </center>
            <a
              href={
                'https://discordapp.com/api/oauth2/authorize?client_id=441321755206877196&redirect_uri=' +
                SITE_URL +
                '/callback' +
                '&response_type=code&scope=identify%20guilds'
              }
            >
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
