export interface GfxProp {
    	width: number
    	height: number
    	fps: number
    	color: string
    	opacity: number
}

export interface MC {
    constructor()
}

export interface GfxOBJ {
	["id"]
}
export interface GfxClip{
    properties:GfxProp
	exportRoot: ()=>MC
}

declare function require(string): any;

export const clips = {
	//clips
}
