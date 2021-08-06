const Category = require('../models/Category')

module.exports = {

    createCategory : async (req,res) => {
        try{
            const cat = new Category({
                name : req.query.name,
                image : req.query.image || {}
            })
            await cat.save()
            return res.status(200).json({
                err: false,
                message: 'Category created successfully.'
            })
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Could not create category."
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