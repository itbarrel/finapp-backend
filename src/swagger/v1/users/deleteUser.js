module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Delete User',
    operationId: 'DeleteUser',
    parameters: [{
        description: 'User ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
    produces: ['application/json'],
    responses: {
        200: {
            description: '{ message: user is deleted }',
        },
        401: {
            description: 'Token Expire',
        },
        500: {
            description: 'Something went wrong',
        },
    },
    security: [
        {
            authToken: [],
        },
    ],
    tags: ['v1/Users'],
}
