const db = require('../../database/models');
const { Op } = require("sequelize");
const moment = require("moment")
const {validationResult} = require('express-validator');
const bcript = require('bcryptjs');

const productsController = {
    products: (req, res) => {

        let pagina = Number(req.query.page)

        db.product.findAndCountAll({
            include: [
                {association: "category"},
                {association: "images"}
            ],
            attributes: ['id', 'name', 'description'],
            distinct: true,
            limit: 5,
            offset: (pagina ? (pagina-1)*5 : 0)
        })
        .then(function(userResponse)
        {
            delete userResponse.rows.category
            delete userResponse.rows.images
            //return res.json(userResponse)
            db.category.findAll({
                include: [
                    {association: "products"}
                ]
            })
            .then(function(categoria)
            {
                //return res.json(categoria)
                let arrayCategorias = []
                let objetoCategoria = {}
                categoria.forEach(element => {
                    let estructuraCategoria = {
                        name: element.dataValues.name,
                        length: element.dataValues.products.length
                    }
                  //objetoCategoria[(element.dataValues.name)] = element.dataValues.products.length
                  arrayCategorias.push(estructuraCategoria)
                });

                let arrayProducts = []

                userResponse.rows.forEach(element => {
                    let objetoProduct = {
                        id: element.dataValues.id,
                        name: element.dataValues.name,
                        description: element.dataValues.description,
                        arrayImagenes: element.dataValues.images, 
                        detail: '/api/products/'+element.dataValues.id}
                    arrayProducts.push(objetoProduct)
                });
                
                let estructura = {
                    count: userResponse.count,
                    countTotalCategories: arrayCategorias.length,
                    countByCategory: arrayCategorias,
                    products: arrayProducts,
                    previous: pagina > 1 && pagina < (userResponse.count/5)? '/api/products/?page='+(pagina-1) : null,
                    next: pagina < (userResponse.count/5) ? '/api/products/?page='+(pagina+1) : null
                    }
                
    
                return res.json(estructura)
            })
            
        })
    },

    lastProduct: (req, res) => {
        db.product.findAll({
            include: [
                {association: "images"}
            ]
        })
        .then(function(products)
        {
            let estructura = {
                lastProduct: products[products.length-1] 
            }

            return res.json(estructura)
        })
    },

    productDetail: (req, res) => {
        db.product.findByPk(req.params.id, {
            include: [
                {association: "images"},
                {association: "color"},
                {association: "category"},
                {association: "brand"}
            ],

            attributes: ['id', 'name', 'stock', 'stock_min', 'stock_max', 'price', 'discount', 'description', 'extended_description']
        })
        .then(function(product)
        {
            let estructura = {
                ...product.dataValues,
                color: product.color.name,
                category: product.category.name,
                brand: product.brand.name,
                urlImagenPrincipal: '/images/'+product.images[0].name
            }
            return res.json(estructura)
        })
    },

    productSearch: (req, res) => {
        db.product.findAll(
            {
                where: {
                    name: {[Op.like]: "%" + req.query.word + "%"}
                },
                include: [
                    {association: "images"}
                ]
            }
        )
        .then(function(products)
        {
            let arrayProducts = []

                products.forEach(element => {
                    let objetoProduct = {
                        id: element.dataValues.id,
                        name: element.dataValues.name,
                        description: element.dataValues.description,
                        arrayImagenes: element.dataValues.images, 
                        detail: '/api/products/'+element.dataValues.id,
                        imagenPrincipal: '/images/'+element.dataValues.images[0].name
                    }
                    arrayProducts.push(objetoProduct)
                });
                
                let estructura = {
                    products: arrayProducts
                    }
            return res.json(estructura)
        })
    }
}

module.exports = productsController;