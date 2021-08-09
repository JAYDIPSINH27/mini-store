const cloudinary = require('../config/cloudinary_config')

const uploadImage = async(image,type) => {
    return cloudinary.uploader.upload(image,{ folder: `${type}/` })
}

const deleteImage = async(id) => {
    return cloudinary.uploader.destroy(id)
}

module.exports = {

    uploadImages : (type,images) => {
        if(!images || images.length == 0) {
            return new Promise((resolve) => resolve([]))
        }
        let promises = []
        for (let image of images){
            promises.push(uploadImage(image,type)
            .then(({url,public_id}) => {
                return {
                    url,
                    public_id 
                }
            })
            .catch(error => {
                return {
                    err : true
                }
            })
            )
        }
        return Promise.all(promises)
    },

    deleteImages : (images) => {
        if(!images || images.length == 0) {
            return new Promise((resolve) => resolve([]))
        }
        let promises = []
        for (let image of images){
            promises.push(
                deleteImage(image)
                .then(({result}) => {
                    if(result === 'ok'){
                        return {
                            err : false,
                            id : image
                        }
                    }else{
                        return {
                            err : true
                        }
                    }
                })
                .catch(error => {
                    return {
                        err : true
                    }
                })
            )
        }
        return Promise.all(promises)
    }

}
