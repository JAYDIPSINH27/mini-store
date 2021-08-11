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

}