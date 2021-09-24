const {orderPopulate} = require('../utils/populateObjects')
const Order = require('../models/Order')

module.exports = {

    // @desc      Get Orders
    // @route     GET /api/v1/orders
    // @access    Private

    getOrders : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Orders found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Get Orders by Id
    // @route     GET /api/v1/orders/:id
    // @access    Private

    getOrderbyId : async (req,res) => {
        console.log(res.results)
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Order found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Cancel Order
    // @route     PUT /api/v1/orders/:id
    // @access    Private

    cancelOrder : async (req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Order.findById(req.params.id)
            .then( async(order) => {
                if(order && order.userId.equals(req.user._id)){
                    console.log("Hi")
                    order.cancelOrder()
                    await order.save()
                    return res.status(200).json({
                        err: false,
                        data: await Order.populate(order,orderPopulate),
                        msg: "Order cancelled Successfully."
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "Order could not be cancelled."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Order could not be cancelled."
            })
        }
    }

}