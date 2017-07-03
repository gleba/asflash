///

//--------------------
return  {
    getStage: function() { return exportRoot.getStage(); },
    getLibrary: function() { return lib; },
    getSpriteSheet: function() { return ss; },
    getImages: function() { return img; }
};
}

var comp = flash(createjs, {})

function init(handleComplete) {
    var loader = new createjs.LoadQueue(false);
    var clip=comp.getLibrary();
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(clip.properties.manifest);
}


function handleFileLoad(evt) {
    var images=comp.getImages();
    if (evt.item.type == "image") {
        images[evt.item.id] = evt.result;
    }
}


function addCentered(o, handleComplete) {
    init(
        function (evt) {
            var clip=comp.getLibrary();
            var ss=comp.getSpriteSheet();
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
                if (root.resize) {
                    root.resize(
                        {
                            dh: canvas.height - clip_h * window_scale,
                            scale: root.scale
                        }
                    )
                }
            }

            //if (dpr == 1) {
            //    stage.scaleX = window_scale
            //    stage.scaleY = window_scale
            //    canvas.width = clip_w * window_scale
            //    canvas.height = clip_h * window_scale
            //} else {
            //    stage.scaleX = window_scale * dpr
            //    stage.scaleY = window_scale * dpr
            //    canvas.width = clip_w  window_scale  dpr
            //    canvas.height = clip_h  window_scale  dpr
            //    canvas.style.width = clip_w * window_scale + "px"//
            //    canvas.style.height = clip_h * window_scale + "px"//
            //}



            var exportRoot
            var stage

            setTimeout(
                function () {
                    exportRoot = new clip[o.exportRoot]()
                    stage = new createjs.Stage(canvas);
                    window.addEventListener('resize', resizeCanvas);
                    resizeCanvas();
                    exportRoot = new clip[o.exportRoot]()
                    stage = new createjs.Stage(canvas);
                    resizeCanvas();
                    stage.addChild(exportRoot);
                    stage.enableMouseOver();
                    stage.update();
                    createjs.Ticker.setFPS(clip.properties.fps);
                    createjs.Ticker.addEventListener("tick", stage);
                    createjs.Touch.enable(stage)
                    handleComplete(exportRoot)


                    function clearEvents() {
                        console.log("clearEvents")

                        stage.removeAllChildren()
                        stage.clear()
                        createjs.Ticker.removeAllEventListeners();
                        createjs.Touch.disable(stage)
                    }

                    canvas.addEventListener ('DOMNodeRemoved', clearEvents, false);
                    canvas.addEventListener ('DOMNodeRemovedFromDocument', clearEvents, false);
                }, 100
            )

            //stage.addChild(exportRoot);
            //stage.update();
            //createjs.Ticker.setFPS(clip.properties.fps);
            //createjs.Ticker.addEventListener("tick", stage);
            //handleComplete(exportRoot)


        }
    )
}
if (!window.clips) window.clips  = {}

window.clips.%clpiname% = {
    lib: ()=>comp.getLibrary(),
    addCentered: addCentered
}