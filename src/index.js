const path = require("path")
const https = require("https")
const express = require("express")
const app = express()

const staticRouter = express.Router("/")
staticRouter.use(express.static(path.join(__dirname, "../static")))

const proxyRouter = express.Router("/proxy")
proxyRouter.use(express.json())
proxyRouter.use((req, res, next) => {
  const { user, password } = req.body;

  if (req.route == "/proxy" && !checkCredentials(user, password)) {
    res.status(401).send("Invalid credentials")
    console.log(Date.now(), " Rejected request for ", req.body)
    return
  }

  next()
})

proxyRouter.post("/proxy", (req, res) => {
  const url = req.query.url
  downloadStream(url, res)
  console.log("Initilized piped download")
})


app.use(staticRouter)
app.use(proxyRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

function downloadStream(url, outputPipe) {
  https.get(url, (res) => {
    res.pipe(outputPipe)
    res.on("finish", () => {
      outputPipe.close()
      console.log("Finished download")
    })
  })
}

function checkCredentials(user, password) {
  const { CR_USER_NAME, CR_PASSWORD } = process.env
  return user == CR_USER_NAME && password == CR_PASSWORD
}
