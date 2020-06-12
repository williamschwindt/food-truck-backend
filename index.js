const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const usersRouter = require('./routers/users-router')
const authRouter = require('./routers/auth-router')
const storesRouter = require('./routers/stores-router')

const server = express()
const port = process.env.PORT || 7000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)
server.use('/api/stores', storesRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: err
    })
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})