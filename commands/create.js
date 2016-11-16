const path = require("path")
const fs = require("fs")

let maindir
let projectDir

module.exports.init = (dir, pDir) => {
    maindir = dir
    projectDir = pDir
    console.log(projectDir)

}

module.exports.run = (target, file) => {
    fs.readFile(
        path.join(target, file), 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
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
            result = "let flash = " + result + "}"
            result += "\nlet clip = {}"
            result += "\nflash(clip, {}, createjs, {})"
            result += "\nmodule.exports = clip"
            fs.writeFile(
                path.join(projectDir, "clips", file), result, 'utf8', (err) => {
                    if (err) return console.log(err);
                }
            );
            console.log(file)

        }
    )
}
const gen = require('dts-generator')
module.exports.generate = () => {
    let clips = []
    let template = fs.readFileSync(path.join(maindir, "templates", "main.d"))
    fs.readdirSync(path.join(maindir, "clips")).forEach(
        f =>
            clips.push(f.slice(0, f.length - 3))
    )
    let exports = clips.map(f => `export const ${f} = require('./clips/${f}') as GfxClip`)
    template += exports.join("\n")
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


