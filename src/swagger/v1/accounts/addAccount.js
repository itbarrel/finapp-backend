module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add Account',
    operationId: 'Addaccount',
    produces: ['application/json'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                        },
                        name: {
                            type: 'string',
                        },
                        tenant_name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                            format: 'text',
                        },
                        active: {
                            type: 'boolean',
                        },
                    },
                    required: [
                        'id',
                        'name',
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
                '{id:" ",name:" ",tenent_name:" ",description:" ",active: " ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Accounts'],
}
