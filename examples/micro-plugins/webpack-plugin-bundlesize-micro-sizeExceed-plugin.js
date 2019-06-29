module.exports = class SizeExceedMicroPLugin{
    constructor(options = {}){
        this.options = options
    }
    commit(microHandlerResponse) {
        microHandlerResponse.onSizeExceed.tap("WebpackSizeExceedMicroPLugin",res => {
            console.log("res",res)
        })


    }

}