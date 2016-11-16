export interface GfxProp {
    	width: number
    	height: number
    	fps: number
    	color: string
    	opacity: number
}

export class MC {
    constructor()
}
export interface GfxClip {
    properties: GfxProp;
}
export namespace GfxClip{
    properties:GfxProp
    start: MC;
}

declare function require(string): any;
