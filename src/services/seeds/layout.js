const { LayoutService } = require('../resources')

const create = async () => {
    const Layout = new LayoutService('bank')


    const signupLayout = {
        name: 'signup',
        formId: '09ff67ec-67d2-465a-b115-4e1316382408',
        path: '../../../../layouts/signUp'
    }

    await Layout.create(signupLayout)
}

const destroy = async () => Layout.delete({})

module.exports = { create, destroy }
