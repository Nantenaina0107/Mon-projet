const { Frn, Stocks, Vente, Production, User } = require('../models/users')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const bcript = require('bcrypt')
// Fournisseurs 
const getFrn= async(req, res) => {
    Frn.findAll().then(data => {
        res.json(data)
    })
}
const createFrn = async(req, res) => {
    Frn.create(req.body).then(data => {
        res.json({Status: "success"})
    }).catch((err) => {
        res.json({Status: "Erreur"})
    })
}
const getOne = async(req, res) => {
    Frn.findOne({
        where: {
            mail: req.body.mail
        }
    }).then((data) => {
        res.json(data)
    })
}
const pkFrn = async(req, res) => {
    const id = req.params.id
    Frn.findByPk(id).then(data => {
        res.json(data)
    })
}
const updateFrn = async(req, res) => {
    const id = req.params.id
    Frn.update(req.body,{
        where: {
            id: id
        }
    })
}
const deleteFrn = async(req, res) => {
    Frn.destroy({
        where: {
            id: req.params.id
        }
    })
}

// Stocks 

const getStocks = async(req, res) => {
    Stocks.findAll().then((data) => {
        res.json(data)
    })
    Stocks.destroy({
        where: {
            quantite: 0
        }
    })
}
const getStocke = async(req, res) => {
    const noms = req.params.nom
    Stocks.findOne({
        where: {
            nom: noms
        }
    }).then((data) => {
        res.json(data)
    })
}
const createStocks = async(req, res) => {
    Stocks.create(req.body).then((data) => {
        res.json(data)
    })
    console.log(req.body);
}
// Ventes 
const getvente = async(req, res) => {
    Vente.findAll({
        where: {
            status: false
        }
    }).then((data) => {
        res.json(data)
    })
}
const getventeAll = async(req, res) => {
    Vente.findAll().then((data) => {
        res.json(data)
    })
}
const createVente = async(req, res) => {
    Stocks.findOne({
        where: {
            nom: req.body.nom
        }
    }).then((response) => {
        const prix = response.dataValues.unitaire
        const qte = response.dataValues.quantite
        const vente =  {
            "numero": req.body.numero,
            "produit": req.body.nom,
            "prix": prix,
            "quantite": req.body.quantite,
        }
        if(qte < parseFloat(vente.quantite)) return res.json("Error")
        else {
            Vente.create(vente).then((data) => {
                const val = {
                    "quantite": qte-vente.quantite
                }
                Stocks.update(val,{
                    where: {
                        nom: req.body.nom
                    }
                })
                res.json(data)
            })
                
        }

    })
}
const getPrix = async(req, res) => {
    Vente.findOne({
        attributes: [
            [Sequelize.fn("sum",Sequelize.literal("quantite*prix")),"somme"]
        ],
            where: {
                status: 0
            }
    }).then(data => {
        res.json(data)
    })
}
const payer = async(req, res) => {
    const data = {
        "status": 1
    }
    Vente.update(data,{
        where: {
            status: 0
        }
    })
}

// Production 

const addProd = async(req, res) => {
    Production.create(req.body).then((data) => {
        res.json(data)
    })
}
const getProd = async(req, res) => {
    Production.findAll().then((data) => {
        Production.destroy({
            where: {
                quantite: {
                    [Sequelize.Op.lte]: 1
                }
            }
        })
        res.json(data)
    })
   
}
const getExpire = async(req, res) => {
    const today = new Date()
    Production.findAll({
        where: {
            date: {
                [Sequelize.Op.lte]: today
            }
        }
    }).then((data) => {
        res.json(data)
    })
}
const Recherche = async(req, res) => {
    await Production.findByPk(req.params.id).then(response => {
        res.json(response)
    })
}
const updateProd = async(req, res) => {
    const id = req.params.id

    await Production.findByPk(id).then(response => {
        const values = {
            "quantite": req.body.qte
        }
        Production.update(values,{
            where: {
                id: id
            }
        })
        const data = {
            "nom": req.body.nom,
            "quantite": req.body.quantite,
            "unitaire": req.body.prix
        }
        Stocks.create(data)
    })

}
const total = async(req, res) => {
    const today = new Date()
    Production.findAndCountAll({
        where: {
            date: {
                [Sequelize.Op.lte]: today
            }
        }
    }).then((data) => {
        res.json(data)
    })
}
const deleteProd = async(req, res) => {
    await Production.destroy({
        where: {
            id: req.params.id
        }
    })
}
// Authentification

const inscription = async(req, res) => {
    const salt = await  bcript.genSalt(10)
    bcript.hash(req.body.password, salt, (err, hash) => {
        if(err) return res.json({error: "Error for hashing password"})
        const values = {
           "name": req.body.name,
           "mail": req.body.mail,
           "password": hash
        }
        User.findOne({
            where: {
                mail: values.mail
            }
        }).then((response) => {
            if(response != null){
                res.json({Status: "Erreur"})
            }else{
                const  user =  User.create(values)
                if(!user) return res.json({Status: "Erreur"})
                return res.json({Status: "Success"})
            }
        })
    }
    )
}
const authentification = async(req, res) => {
    const user = await User.findOne({where: {mail: req.body.mail}})
    if(user == null) return res.json({error: "Email not exist"})
    else {
        const pwd = user.dataValues.password
        bcript.compare(req.body.password, pwd, (err, response) => {
            if(err) return res.json({error: "Password compare error"})
            if(response) {
                const name = user.dataValues.name
                const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'})
                res.cookie('token', token)
                return res.json({Status: "Success"})
            }else{
                return res.json({error: "Password not matched"})
            }
        })
        
    }
}
const logout = async(req, res) => {
    res.clearCookie('token')
    return res.json({Status: "Success"})
}


    

module.exports = {
 getFrn, createFrn, updateFrn, deleteFrn, pkFrn, getStocks, createStocks, 
     getvente, createVente, getStocke, getPrix, payer, addProd, getProd, 
     Recherche, updateProd, inscription, authentification, logout, getventeAll, getOne, total, getExpire, deleteProd
}