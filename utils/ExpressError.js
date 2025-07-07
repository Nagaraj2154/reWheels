class ExpressError extends Error {
    constructor(status , message){
        super();
        this.message = message;
        this.status = status;
    }
}

// class ExpressError extends Error {
//     constructor(statusCode, message) {
//         super();
//         this.statusCode = statusCode;
//         this.message = message;
//     }
// }

module.exports = ExpressError;