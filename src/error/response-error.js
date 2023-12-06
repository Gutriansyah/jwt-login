class ResponseEror extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export { ResponseEror };
