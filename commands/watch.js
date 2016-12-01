const once = require("./once")
const chokidar = require('chokidar');


module.exports.run = (dir) =>{
    console.log("start watch", dir)

    let watcher = chokidar.watch(dir, {
        ignored: /[\/\\]\./,
        persistent: true
    });
//
//// Something to use when events are received.
    let log = console.log.bind(console)
    let timeout
    let temoutFN = ()=>{
        timeout = false
        once.run(dir)
    }
    let onlyRootFilter = (path) =>{
        if (path.split("\\").length==1){
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(temoutFN, 300)
        }
    }
    watcher
        .on('add', onlyRootFilter)
        .on('change', onlyRootFilter)
        .on('unlink', onlyRootFilter)
}



