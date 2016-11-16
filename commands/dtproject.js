const path = require("path")
const fs = require("fs")

module.exports = () => {
    let target = path.resolve(".")
    let project
    const check = (dir) => {
        let dirs = fs.readdirSync(dir)
        if (dirs.indexOf("node_modules") >= 0) {
            project = dir
            console.log("project:",project)
        } else {
            if (path.dirname(dir) != path.dirname(path.dirname(dir)))
                check(path.dirname(dir))
        }
    }
    check(target)
    return project
}

