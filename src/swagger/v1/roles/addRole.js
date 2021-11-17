module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add Role',
    operationId: 'addrole',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        name: {
                            type: 'string',
                        },
                        value: {
                            type: 'string',
                        },
                        permissions: {
                            type: 'string',
                            format: 'json',
                        },
                        default: {
                            type: 'boolean',
                        },
                        active: {
                            type: 'boolean',
                        },
                    },
                    required: [
                        'name',
                        'permissions',
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
            description:
                '{id:" ",name:" ",value:" ",permissions:" ",default:" ",createAt:" ",updatedAt:" ",deletedAt:" "}',
        },
        401: {
            description: 'Token Expire',
        },
        422: {
            description: 'Invalid input',
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
    tags: ['v1/Roles'],
}
