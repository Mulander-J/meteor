module.exports={
    valCheck : (req,validator={validationResult:(v)=>v})=>{
        if(!req.body){
            return {
                ...codeDic.ERROR_NULL
            }
        }
        let errors = validator.validationResult(req);
        if(!errors.isEmpty()) {
            return {
                ...codeDic.ERROR_MISS,
                errors: errors.mapped()
            }
        }
        return false
    }
};