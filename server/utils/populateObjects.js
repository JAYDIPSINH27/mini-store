module.exports = {

    productPopulate : [
        {
            path : 'category',
            select : 'name'
        },
        {
            path : 'stores',
            select : 'name rating address'
        },
        {
            path : 'images',
            select : 'public_id url'
        },
    ],

    categoryPopulate : [
        {
            path : 'images',
            select : 'public_id url'
        }
    ],

    storePopulate : [
        {
            path : 'products',
            populate: {
                path: 'productId',
                select: 'name description category',
                populate : {
                    path : 'category',
                    select : 'name'
                }
            } 
        },
        {
            path : 'images',
            select : 'public_id url'
        }
    ],

    userPopulate : [
        {
            path : 'image',
            select : 'public_id url'
        }
    ]
}