const express = require('express')
const fs = require('fs')
const hbs = require('hbs')

const app = express()

// Set template engine
app.set('view_engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`)

// Helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('toUpper', text => text.toUpperCase())

// Middleware
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', `${log}\n`, err => {
    if (err) {
      console.log('Unable to append to server log. 🤔')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(`${__dirname}/public`))

// Routes
app.get('/', (req, res) => {
  // Render Handlebars view
  res.render('index.hbs', {
    welcomeMessage: 'Welcome Biatch!',
    pageTitle: 'Home'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Oops, something went wrong. :('
  })
})

// Listening PORT
app.listen(3000, () => {
  console.log('Server is listening on PORT:3000 👏')
})