module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'reset Password',
    operationId: 'resetPassword',
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
                        password: {
                            type: 'string',
                            format: 'password',
                        },

                    },
                    required: [
                        'token',
                        'password',
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
            description: '{ message: Password reset successfully }',
        },
        422: {
            description: 'Invalid Input',
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
