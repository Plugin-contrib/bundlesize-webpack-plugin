module.exports = class SizeSafeMicroPLugin{
    constructor(options = {}){
        this.options = options
    }
    commit(microHandlerResponse) {
        microHandlerResponse.onSizeSafe.tap("WebpackSizeSafeMicroPLugin",res => {
            console.log("res",res)
        })


    }

}