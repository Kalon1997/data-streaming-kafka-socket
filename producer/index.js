const app = require('express')()
const { adminConnect } = require('./admin')
const {producerConnect} = require('./producer')

app.listen(5000, () => {
console.log("running at 5000....")
adminConnect()
producerConnect()
})