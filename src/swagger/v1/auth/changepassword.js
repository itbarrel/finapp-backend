module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'change Password',
    operationId: 'changePassword',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        oldPassword: {
                            type: 'string',
                            format: 'password',
                        },
                        newPassword: {
                            type: 'string',
                            format: 'password',
                        },

                    },
                    required: [
                        'oldPassword',
                        'newPassword',
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
            description: '{ message: Password is updated successfully}',
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
