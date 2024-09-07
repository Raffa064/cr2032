const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Ok")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
