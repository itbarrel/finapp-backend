module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update Role',
    operationId: 'updateRole',
    parameters: [{
        description: 'Role ID',
        in: 'path',
        name: 'id',
        required: true,
        type: 'string',
        format: 'uuid',
    }],
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

                    type: 'object',
                },
            },
        },
        description: 'Body for Login',
        required: true,
    },
    responses: {
        200: {
            description:
                '{id:" ",userName:" ",email:" ",password:" ",RoleId:" ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Roles'],
}
