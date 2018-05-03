import axios from 'axios'
import qs from 'qs'
import Discord from 'discord.js'
import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client()

const SERVER_ID = process.env.SERVER_ID
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const token = process.env.TOKEN

client.on('ready', () => {
  console.log(`> Bot iniciado`)
})

client.on('guildMemberAdd', member => {
  member.addRole(
    client.guilds.find('id', SERVER_ID).roles.find('name', 'Novato').id
  )
})

// client.on('message', message => {
//   if (message.attachments) {
//     console.log(message.attachments)
//   }
// })

function addRole(member, role) {
  member.addRole(
    client.guilds.find('id', SERVER_ID).roles.find('name', role).id
  )
}

function removeRole(member, role) {
  if (member.roles.find('name', role))
    member.removeRole(
      client.guilds.find('id', SERVER_ID).roles.find('name', role).id
    )
}

function handleTags(member, { data }) {
  if (!member.roles.find('name', 'Novato')) return
  removeRole(member, 'Novato')
  if (data['1'] !== null) {
    addRole(member, '.' + data['1'])
  }
  if (data['2'] === 'a') {
    addRole(member, 'Estatista')
  }
  if (data['2'] === 'c') {
    addRole(member, 'Sem Especificação')
  }
  if (data['3'] === 'a') {
    addRole(member, 'Anarquista')
  }
  if (data['3'] === 'c') {
    addRole(member, 'Sem Especificação')
  }
  if (data['4'] === 'a') {
    addRole(member, 'Libertário')
    addRole(member, 'Jusnaturalista')
  }
  if (data['4'] === 'b') {
    addRole(member, 'Anarquista')
  }
  if (data['4'] === 'c') {
    addRole(member, 'Anarquista')
  }
  if (data['4'] === 'd') {
    addRole(member, 'Anarquista')
    addRole(member, 'Utilitarista')
  }
  if (data['4'] === 'e') {
    addRole(member, 'Sem Especificação')
  }
  if (data['5'] === 'a') {
    addRole(member, 'Pró Aborto')
  }
  if (data['5'] === 'b') {
    addRole(member, 'Anti Aborto')
  }
  if (data['6'] === 'a') {
    addRole(member, 'Pró PI')
  }
  if (data['6'] === 'b') {
    addRole(member, 'Anti PI')
  }
  if (data['7'] === 'a') {
    addRole(member, '-18')
  }
  if (data['7'] === 'b') {
    addRole(member, '+18')
  }
}

client.login(token)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.set('secret', 'process.env.JWT_SECRET')

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
          ? 'https://fraternidade-hoppeana.now.sh/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.redirect(
          301,
          process.env.NOW_URL
            ? 'https://fraternidade-hoppeana.now.sh' +
              '/?code=' +
              access_token +
              '&refresh=' +
              refresh_token
            : 'http://localhost:3000/?code=' +
              access_token +
              '&refresh=' +
              refresh_token
        )
      })
      .catch(err => {
        console.log(err)
        res.send({ error: true })
      })
  })

  app.post('/refresh', (req, res) => {
    axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: req.body.refresh_token,
        redirect_uri: process.env.NOW_URL
          ? 'https://fraternidade-hoppeana.now.sh' + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.send({ access_token: access_token, refresh_token: refresh_token })
      })
      .catch(err => {
        console.log(err)
        res.send({ error: true })
      })
  })

  app.post('/handleTags', (req, res) => {
    if (req.body.token) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/users/@me`,
        headers: {
          Authorization: 'Bearer ' + req.body.token
        }
      }).then(({ data }) => {
        const member = client.guilds
          .find('id', SERVER_ID)
          .members.find('id', data.id)
        handleTags(member, req.body)
        res.send(member)
      })
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
      }).then(({ data }) => {
        let tags = []
        for (let tag of data.roles) {
          tags.push(
            client.guilds.find('id', SERVER_ID).roles.find('id', tag).name
          )
        }
        res.send(tags)
      })
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
            client.guilds.find('id', SERVER_ID).roles.find('name', 'Novato').id
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

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(3000, err => {
    if (err) throw err
    console.log(`> Web service ready on http://localhost:${3000}`)
  })
})
