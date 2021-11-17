module.exports = {
    consumes: [
        'application/json',
    ],
    description: 'Add User',
    operationId: 'addUser',
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
                    required: [
                        'id',
                        'userName',
                        'email',
                        'password',
                        'firstName',
                        'lastName',
                        'RoleId',
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
                '{id:" ",userName:" ",email:" ",password:" ",RoleId:" ",createAt:" ",updatedAt:" ",deletedAt:" "}',
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
    tags: ['v1/Users'],
}
