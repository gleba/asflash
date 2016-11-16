

var clip = {}
flash(clip, {}, createjs, {})
clip.exportRoot = function () {
    return new clip.start()
}
module.exports = clip