const express = require('express')
const { getFrn, createFrn,pkFrn, deleteFrn, updateFrn, getStocks, createStocks, getPrix,authentification,inscription, getvente, createVente, getStocke, payer, addProd, getProd, Recherche, updateProd, logout, getventeAll, getOne, total, getExpire, deleteProd } = require('../controller/controllers')
const Route = express.Router()
// Authentification 
Route.route('/login').post(authentification)
Route.route('/register').post(inscription)
Route.route('/logout').get(logout)
// Fournisseurs 
Route.route('/getfrn').get(getFrn)
Route.route('/createfrn').post(createFrn)
Route.route('/pkfrn/:id').get(pkFrn)
Route.route('/updatefrn/:id').put(updateFrn)
Route.route('/deletefrn/:id').delete(deleteFrn)

// Stocks
Route.route('/getstocks').get(getStocks)
Route.route('/getstocke/:nom').get(getStocke)
Route.route('/createstocks').post(createStocks)
//Ventes
Route.route('/getvente').get(getvente)
Route.route('/createvente').post(createVente)
Route.route('/getprix').get(getPrix)
Route.route('/payer').put(payer)
Route.route('/mouv').get(getventeAll)

// Production
Route.route('/addprod').post(addProd)
Route.route('/getprod').get(getProd)
Route.route("/pkprod/:id").get(Recherche)
Route.route('/updateprod/:id').put(updateProd)
Route.route('/getone').post(getOne)
Route.route('/total').get(total)
Route.route('/getexpire').get(getExpire)
Route.route('/deleteprod/:id').delete(deleteProd)

module.exports = Route