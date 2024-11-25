const Sequelize = require('sequelize')
const Model = Sequelize.Model

const sequelize = new Sequelize("ihm","root","",{
    host: "localhost",
    dialect: "mariadb"
})

sequelize.authenticate().then(() => {
    console.log("Connection reussit");
}).catch(() => {
    console.log("Connection erreur");
})

class User extends Model {}
User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: "user"
})

class Frn extends Model {}
Frn.init({
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pays: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ville: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: "fournisseurs"
})

class Stocks extends Model {}
Stocks.init({
    nom:{
        type:Sequelize.STRING,
        allowNull: false
    },
    quantite:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    unitaire:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName: "stocks"
})

class Vente extends Model {}
Vente.init({
    numero:{
        type:Sequelize.STRING,
        allowNull:false
    },
    produit:{
        type:Sequelize.STRING,
        allowNull:false
    },
    prix:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    quantite:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
},{
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName: "vente"
})

class Production extends Model {}
Production.init({
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantite:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    fournisseurs: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName:"production"
})

sequelize.sync().then(() => {
    console.log("Table crée avec success");
}).catch(err => {
    console.log(err);
})

module.exports = {
    Frn, Stocks, Vente, Production, User
}