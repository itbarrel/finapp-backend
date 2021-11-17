module.exports = (role, permissionsToChk) => {
    const {
        permissions,
    } = role

    let granted = false
    let missed = false

    if (Object.keys(permissions).length > 0 && permissionsToChk && permissionsToChk.length > 0) {
        permissionsToChk.forEach((per) => {
            if (permissions[per.entity] && !missed) {
                const actions = permissions[per.entity]

                if (actions.includes('*')) granted = true
                else {
                    per.actionsTocheck.forEach((action) => {
                        granted = !(!actions.includes(action))

                        if (!granted) missed = true
                    })
                }
            } else granted = false
        })

        if (granted && !missed) return true
        return false
    }
    return false
}
