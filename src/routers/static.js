const express = require("express")
const { join } = require("path")

const staticRouter = express.Router()
staticRouter.use(express.static(join(__dirname, "../../static")))

module.exports = staticRouter
