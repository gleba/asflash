///

var clip = {}
var images = {}
var ss = {}

flash(clip, images, createjs, ss, {})

function init(handleComplete) {
    var loader = new createjs.LoadQueue(false);

    loader.installPlugin(createjs.Sound);

    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(clip.properties.manifest);
}
function handleFileLoad(evt) {
    if (evt.item.type == "image") {
        images[evt.item.id] = evt.result;
    }
}

function addCentered(o, handleComplete) {
    init(
        function (evt) {

            var queue = evt.target;
            var ssMetadata = clip.ssMetadata;
            for (i = 0; i < ssMetadata.length; i++) {
                ss[ssMetadata[i].name] = new createjs.SpriteSheet(
                    {
                        "images": [queue.getResult(ssMetadata[i].name)],
                        "frames": ssMetadata[i].frames
                    }
                )
            }


            var canvas = document.getElementById(o.canvasID);
            var dpr = window.devicePixelRatio

            var exportRoot = new clip[o.exportRoot]()
            var stage = new createjs.Stage(canvas);


            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            function resizeCanvas() {

                var clip_w = clip.properties.width;
                var clip_h = clip.properties.height;
                var window_scale_h = window.innerHeight / clip_h
                var window_scale_w = window.innerWidth / clip_w
                var window_scale = Math.min(window_scale_h, window_scale_w)

                canvas.width = window.innerWidth
                canvas.height = window.innerHeight

                stage.scaleX = window_scale
                stage.scaleY = window_scale
                root.scale = window_scale
                root.x = exportRoot.x = (canvas.width / 2 - (window_scale * clip_w) / 2) / window_scale
                root.y = 0
            }

            //if (dpr == 1) {
            //    stage.scaleX = window_scale
            //    stage.scaleY = window_scale
            //    canvas.width = clip_w * window_scale
            //    canvas.height = clip_h * window_scale
            //} else {
            //    stage.scaleX = window_scale * dpr
            //    stage.scaleY = window_scale * dpr
            //    canvas.width = clip_w * window_scale * dpr
            //    canvas.height = clip_h * window_scale * dpr
            //    canvas.style.width = clip_w * window_scale + "px"//
            //    canvas.style.height = clip_h * window_scale + "px"//
            //}
            stage.addChild(exportRoot);
            stage.update();
            createjs.Ticker.setFPS(clip.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);
            handleComplete(exportRoot)

        }
    )
}

module.exports = {
    source: clip,
    addCentered: addCentered
}