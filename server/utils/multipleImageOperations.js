const Image = require('../models/Image')

module.exports = {
    
    uploadImages : (id,type,images) => {
        if(!images || images.length == 0) {
            return new Promise((resolve) => resolve([]))
        }
        let promises = []
        for (let i of images){
            const image = new Image()
            promises.push(image.upload(id,i,type)
            .then(async (res) => {
                if(res){
                    await image.save()
                }
                return res
            }))
        }
        return Promise.all(promises)
    },

    deleteImages : (images) => {
        if(!images || images.length == 0) {
            return new Promise((resolve) => resolve([]))
        }
        let promises = []
        for(let id of images){
            promises.push(Image.findById(id)
            .then(async (data) => {
                if(data){
                    await data.deleteOne()
                }
            }))
        }
        return Promise.all(promises)
    }
}