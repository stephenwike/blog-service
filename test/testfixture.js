class Response {
    constructor() {
        this.response;
    }
    
    Send(val) {
        this.response = val;
    }
}

module.exports = { 
    ValidAuthorRequest: () => {
        let retVal = {};
        return retVal.body = { name: "SomeAuthor Name" };
    },

    GetResponseObject: () => {
        return new Response();
    }
}