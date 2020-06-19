let express = require('express')
let uploadRoute = require('./route/uploadPicture')

let app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/uploads', uploadRoute)

app.get('/', (req, res, next) => {
    res.render('index')
})

app.use((req, res, next) => {
    res.json({
        message: '404 Pages Not Found'
    })
})

app.use((error, req, res, next) => {
    res.json({
        message: error.message
    })
})

let PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running on PORT '+PORT)
})