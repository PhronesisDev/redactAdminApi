const express = require('express')
const ad_Index = require('./routes/application.route')
const app = express()
app.use(express.json())

app.use('/',ad_Index.ad_route)
app.listen(3000, function () {
    console.log("server running")
})

