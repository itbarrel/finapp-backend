module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'forgot Password API',
    operationId: 'forgotPassword',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        domain: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                        },
                    },
                    required: [
                        'domain',
                        'email',
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
            description: '{ message: Forget Password, Token: Token }',
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
