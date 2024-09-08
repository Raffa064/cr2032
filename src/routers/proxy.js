const { https } = require("follow-redirects")
const express = require("express")

const proxyRouter = express.Router()
proxyRouter.use(express.json())
proxyRouter.use(authentication)

proxyRouter.post("/", (req, res) => {
  const url = req.query.url
  initPipedDownload(url, res)
})

function authentication(req, res, next) {
  const { user, password } = req.body;

  if (!checkCredentials(user, password)) {
    res.status(401).send("Invalid credentials")
    console.log(`${Date.now()} Rejected request for ${user}`)
    return
  }

  next()
}

function checkCredentials(user, password) {
  const { CR_USER_NAME, CR_PASSWORD } = process.env

  console.log(user, password, CR_USER_NAME, CR_PASSWORD)

  return user == CR_USER_NAME && password == CR_PASSWORD
}

function initPipedDownload(url, res) {
  const req_id = parseInt(Math.floor(Math.random() * 1000))
  
  try {  
    https.get(url, (urlRes) => {
      console.log(`[${req_id}] Initilized piped download: ${url}`)
      
      try {
        res.writeHead(urlRes.statusCode, {
          "Content-Type": urlRes.headers["content-type"],
          "Content-Length": urlRes.headers["content-length"],
        })

      } catch(err) {
        console.log(`[${req_id}] Error while writing to response head: ${err}`)
      }

      urlRes.pipe(res)
      urlRes.on("end", () => {
        res.end()
        console.log(`[${req_id}] Finished download`)
      })
    })
  } catch(err) {
    console.log(`[${id}] Can't get: ${err}`)
    res.status(400).send("Bad request")
  }
}

module.exports = proxyRouter
