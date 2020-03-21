exports.joiGenerateValidationError = function(err) {
    //console.log(err)
    if(err){
        const error = {}

        err.map(e => {
            error[e.path[0]]  = e.message;
            return error;
        })

        return error
    }
}