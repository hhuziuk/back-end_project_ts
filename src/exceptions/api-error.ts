class ApiError extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static AccessDenied() {
        return new ApiError(403, 'Access denied');
    }
}

export default ApiError;
