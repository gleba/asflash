const path = require("path")
const fs = require("fs")

const create = require("./create")

module.exports.run = (dir) => {
    let target = path.resolve(dir)
    fs.readdirSync(target).forEach(
        f => {
            if (f.slice(f.length-3,f.length) == ".js") {
                create.run(target, f)
            }
        }
    )
    create.generate()
}
