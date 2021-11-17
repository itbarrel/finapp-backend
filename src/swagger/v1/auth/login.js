module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Login API',
    operationId: 'login',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        domain: {
                            type: 'string',
                        },
                        credentials: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                },
                            },
                            required: [
                                'email',
                                'password',
                            ],
                        },
                    },
                    required: [
                        'domain',
                        'credebtials',
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
    tags: ['v1/Auth'],
}
