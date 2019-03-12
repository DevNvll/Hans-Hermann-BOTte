import axios from 'axios'
import qs from 'qs'
import Discord from 'discord.js'
import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import session from 'express-session'
import TagsHandler from './handleTags'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client()
const {
  SERVER_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  SITE_URL,
  TOKEN: token
} = process.env

client.on('ready', () => {
  console.log(`> Bot iniciado`)
})

client.on('guildMemberAdd', member => {
  member
    .addRole(
      client.guilds
        .find(g => g.id === SERVER_ID)
        .roles.find(r => r.name === 'Novato').id
    )
    .catch(err => console.log(err))
})

client.login(token)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const { handleTags } = new TagsHandler(client, SERVER_ID)

nextApp.prepare().then(() => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(
    session({
      name: 'fh_session',
      cookie: {
        maxAge: 1800000
      },
      resave: false,
      saveUninitialized: false,
      secret: 'um4br4ç0procl4n',
      unset: 'destroy'
    })
  )

  app.use((req, res, next) => {
    if (!req.session.user) {
      res.clearCookie('fh_session')
    }
    next()
  })

  function checkAuth(req, res, next) {
    if (req.session.user) {
      next()
    } else {
      res.clearCookie('fh_session')
      res.status(401).send('Unouthorized')
    }
  }

  app.get('/callback', (req, res) => {
    axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: req.query.code || req.body.code || req.params.code,
        redirect_uri: process.env.NOW_URL
          ? SITE_URL + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        req.session.user = { access_token, refresh_token }
        res.redirect(301, '/')
      })
      .catch(err => {
        console.log(err)
        res.send({ error: true })
      })
  })

  app.post('/handleTags', checkAuth, (req, res) => {
    if (req.body.token || req.session.user) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/users/@me`,
        headers: {
          Authorization: 'Bearer ' + req.session.user.access_token
        }
      })
        .then(({ data }) => {
          const member = client.guilds
            .find(g => g.id === SERVER_ID)
            .members.find(m => m.id === data.id)
          handleTags(member, req.body)
          res.send(member)
        })
        .catch(err => console.log(err))
    } else {
      res.send(req.body)
    }
  })

  app.get('/userTags/:userid', (req, res) => {
    if (req.params.userid) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
          req.params.userid
        }`,
        headers: {
          Authorization: 'Bot ' + token
        }
      })
        .then(({ data }) => {
          let tags = data.roles.map(
            tag =>
              client.guilds
                .find(g => g.id === SERVER_ID)
                .roles.find(r => r.name === tag).name
          )
          res.send(tags)
        })
        .catch(err => console.log(err))
    } else {
      res.send(req.body)
    }
  })
  app.get('/userRoles/:userid', (req, res) => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
        req.params.userid
      }`,
      headers: {
        Authorization: 'Bot ' + token
      }
    })
      .then(({ data }) => {
        res.send(data.roles)
      })
      .catch(err => res.send('error'))
  })

  app.get('/isPending/:userid', (req, res) => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
        req.params.userid
      }`,
      headers: {
        Authorization: 'Bot ' + token
      }
    })
      .then(({ data }) => {
        for (let role of data.roles) {
          if (
            role ===
            client.guilds
              .find(g => g.id === SERVER_ID)
              .roles.find(r => r.name === 'Novato').id
          ) {
            res.send(true)
            return
          }
        }
        res.send(false)
      })
      .catch(err => res.send('error'))
  })

  app.get('/guildRoles', (req, res) => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/roles`,
      headers: {
        Authorization: 'Bot ' + token
      }
    })
      .then(({ data }) => {
        res.send(data)
      })
      .catch(err => res.send('error'))
  })

  app.post('/logout', (req, res) => {
    req.session.destroy()
    res.send('success')
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(3000, err => {
    if (err) throw err
    console.log(`> Web service ready on http://localhost:${3000}`)
  })
})
