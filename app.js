const express = require('express')
const app = express()
const router = require('./routers/index')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})