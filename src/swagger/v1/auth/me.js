module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Me API',
    operationId: 'Me',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        token: {
                            type: 'string',
                            format: 'text',
                        },

                    },
                    required: [
                        'token',
                    ],
                    type: 'object',
                },
            },
        },
        description: 'Body for API',
        required: true,
    },
    responses: {
        200: {
            description: '{ message: Welcome, token: Token, permissions: role.permissions, user}',
        },
        403: {
            description: 'Invalid Credentials \n Invalid username (email) or password.',
        },
        422: {
            description: 'Unprocessable Entity',
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
    tags: ['v1/Auth'],
}
