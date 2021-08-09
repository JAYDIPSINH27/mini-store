const Category = require('../models/Category')
const {uploadImages} = require('../utils/imageOperations')

module.exports = {

    createCategory : async (req,res) => {
        try{
            const cat = new Category({
                name : req.body.name
            })
            let images = []
            images.push(req.body.image)
            uploadImages("categories",images)
            .then(async (data) => {
                console.log(data)
                if(!data || data[0].err){
                    return res.status(400).json({
                        err: true,
                        message: 'Could not upload image.'
                    })
                }else{
                    cat.image = data[0]
                    await cat.save()
                    return res.status(200).json({
                        err: false,
                        message: 'Category created successfully.'
                    })
                }
            })
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: "Could not create category."
            })
        }
    },

    getCategorybyId : async (req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Category.findById(req.query.id)
            .then( async(cat) => {
                if(product){
                    return res.status(200).json({
                        err: false,
                        data: cat
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No such category exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err : true,
                msg : "Could not get categories."
            })
        }
    },

    getCategories : async (req,res) => {
        try{
            let page = req.query.page? Math.max(req.query.page,0) : 0
            let perPage = 10
            Category.find({}).limit(page).skip(perPage*(page))
            .then( async(categories) => {
                if(categories && categories.length > 0){
                    return res.status(200).json({
                        err: false,
                        page,
                        data: categories
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No categories exist for this page."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any categories."
            })
        }
    }

}