module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Update User',
    operationId: 'updateUser',
    parameters: [{
        description: 'User ID',
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
                        userName: {
                            type: 'string',
                        },
                        firstName: {
                            type: 'string',
                        },
                        middleName: {
                            type: 'string',
                        },
                        lastName: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                        },
                        avatar: {
                            type: 'string',
                            format: 'text',
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                        },
                        officePhone: {
                            type: 'string',
                        },
                        mobilePhone: {
                            type: 'string',
                        },
                        countryCode: {
                            type: 'string',
                        },
                        country: {
                            type: 'string',
                        },
                        lastEmailActivation: {
                            type: 'string',
                            format: 'date',
                        },
                        lastUpdatePassword: {
                            type: 'string',
                            format: 'date',
                        },
                        previousEmail: {
                            type: 'string',
                        },
                        available: {
                            type: 'boolean',
                        },
                        active: {
                            type: 'boolean',
                        },
                        RoleId: {
                            type: 'string',
                            format: 'uuid',
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
    tags: ['v1/Users'],
}
