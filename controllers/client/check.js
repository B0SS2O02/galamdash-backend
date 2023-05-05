
exports.variables = (values, array, res, msg) => {
    for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (!array[value]) {
            res.status(400).json({
                msg: msg || `${value} is empty or not define`
            })
            return false
        }
    }
    return true
}


exports.send = (variable, res, msg) => {
    if (!variable) {
        res.status(404).json({
            msg: msg || `Not define`
        })
    } else {
        res.json(variable)
    }
}