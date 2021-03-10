const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const insert = require('./router/back/insert')
const consult = require('./router/back/consult')
const apiGet = require('./router/urlProcess/get')
const apiSet = require('./router/urlProcess/set')
const apiSummary = require('./router/urlProcess/summary')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(
    session({
        key: "userId",
        secret:"subscribe",
        resave: true,
        saveUninitialized: true,
        cookie: {
            expires: 60 * 60 * 24,
        }
    })
)

app.use("/set",insert);
app.use("/get",consult)
app.use("/api/set",apiSet)
app.use("/api/get",apiGet)
app.use("/api/summary",apiSummary)
app.listen(3000);
