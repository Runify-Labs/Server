const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  console.log('refreshToken', refreshToken)
  const spotfiyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECTURI,
    clientId: '50d6e90a059e426e83f3920f3048b71a',
    clientSecret: process.env.CLIENTSECRET,
    refreshToken
  })

  spotfiyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      })
    })
    .catch(err => {
      console.log('Refresh Error', err)
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  console.log('Login req.body', req.body)
  const code = req.body.code
  const spotfiyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECTURI,
    clientId: '50d6e90a059e426e83f3920f3048b71a',
    clientSecret: process.env.CLIENTSECRET
  })

  spotfiyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    }).catch(err => res.status(400).send(err))
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))