const path = require("path")
const fs = require("fs")

let maindir
let projectDir

module.exports.init = (dir, pDir) => {
    maindir = dir
    projectDir = pDir
}

const cap = function (val) {
    let ar = val.split("-").map(a => a.charAt(0).toUpperCase() + a.slice(1))
    ar[0] = ar[0].toLocaleLowerCase()
    return ar.join("")
};


module.exports.run = (target, file) => {
    let data = fs.readFileSync(
        path.join(target, file), 'utf8'
    )
    //if (data.slice(0,5))
    let i = data.length
    let j = 0

    while (j < 2) {
        i--
        if (data.charAt(i) == "\n") {
            j++
        }
    }

    let result = data.slice(1, i)
    let template = fs.readFileSync(path.join(maindir, "templates", "clip.js")) + ""
     template = template.replace("%clpiname%",cap(file).split(".")[0])
    result = "var flash = " + result + "}"

    result += template
    fs.writeFileSync(path.join(projectDir, "clips", file), result, 'utf8');
    console.log("exported:", file)
}


const gen = require('dts-generator')
module.exports.generate = () => {
    let clips = []
    let template = fs.readFileSync(path.join(maindir, "templates", "main.ts")) + ""
    fs.readdirSync(path.join(projectDir, "clips")).forEach(
        f => {
            if (f != "cplips") clips.push(f.slice(0, f.length - 3))
        }
    )
    let exports = clips.map(f => `${cap(f)} : Gfx`)
    console.log(exports)


    //template += exports.join("\n")
    //console.log("f:", exports)

    template = template.replace("//clips", exports.join(",\n"))

    fs.writeFileSync(
        path.join(projectDir, "gfx.ts"),
        template
    )
    gen.default(
        {
            name: 'asflash',
            project: projectDir,
            out: path.join(projectDir, 'index.d.ts')
        }
    );
}
