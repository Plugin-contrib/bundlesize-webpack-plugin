module.exports = class SizeWarnMicroPLugin{
    constructor(options = {}){
        this.options = options
    }
    commit(microHandlerResponse) {
        microHandlerResponse.onSizeWarn.tap("WebpackSizeWarnMicroPLugin",res => {
            console.log("res",res)
        })


    }

}