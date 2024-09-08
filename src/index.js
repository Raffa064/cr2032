const express = require("express")
const app = express()
const staticRouter = require("./routers/static")
const proxyRouter = require("./routers/proxy")

app.use("/", staticRouter)
app.use("/proxy", proxyRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
