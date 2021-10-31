module.exports = {

	checkStore : async (req,res,next) => {
		if(req.user.hasStore(req.params.id)){
			next()
		}else{
			res.status(400).json({
				err: true,
				msg: "Invalid Store Id."
			})
		}
	}	

}