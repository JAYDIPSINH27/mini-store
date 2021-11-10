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
            path : 'image',
            select : 'public_id url'
        }
    ],

    storePopulate : [
        {
            path : 'products',
            populate: {
                path: 'productId',
                select: 'name description category images',
                populate : [
                    {
                        path : 'category',
                        select : 'name'
                    },
                    {
                        path : 'images',
                        select : 'url'
                    }
                ]
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
        },
        {
            path : 'orders',
            select : 'amount date paymentId paymentGateway status reciept_url',
            populate: {
                path: 'products',
                populate:{
                    path:'productId',
                    select: 'name images',
                    populate:{
                        path:'images',
                        select:'url'
                    }
                }
            } 
        },
        
    ],

    orderPopulate : [
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
            path: 'userId',
            select: 'name email'
        }
    ]
}