#!/usr/bin/env node
const path = require("path")
const watcher = require("./commands/watch")
const once = require("./commands/once")
const create = require("./commands/create")
const dtproject = require("./commands/dtproject")
let args = []

process.argv.forEach((val, index, array) => args.push(val))

let projectDir = path.resolve(dtproject(), "node_modules", "asflash")


if (!projectDir) console.error("Project not found")
else {
    // create.init(path.dirname(args[1]), projectDir)
    create.init(projectDir, projectDir)
    let command = args[2]
    let param = args[3]
    switch (command) {
        case "w":
            let dir = param
            if (!dir) dir = "."
            watcher.run(dir)
            break
        case undefined :
            once.run(".")
    }
}
