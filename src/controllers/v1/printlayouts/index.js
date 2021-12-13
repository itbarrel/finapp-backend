// const formLayout = require('../../../../layouts/signUp')
// const { signUplayout } = require('../../../../layouts')


const { LayoutService } = require('../../../services/resources')
const DynamicFormProxy = require('../../../proxies/dynamicFormProxy')


const printLayout = async (req, res, next) => {
    try {
        console.log("layout");
        const { userId, formId, layoutId } = req.body

        const Layout = new LayoutService()
        console.log(".......", layoutId);
        const layout = await Layout.findByQuery({ id: layoutId }, true)
        console.log(">>>>>>>>", formId);
        if (formId === layout.formId) {


            const form = await DynamicFormProxy.getForm({ id: formId })

            res.send({ message: 'layout', layout, form })


        }

    } catch (error) {
        next(error)
    }
}


module.exports = {
    printLayout,
}
