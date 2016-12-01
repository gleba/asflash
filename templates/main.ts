export abstract class MovieClip {
    // properties
    actionsEnabled: boolean;
    autoReset: boolean;
    static buildDate: string;
    currentFrame: number;
    totalFrames: number;
    currentLabel: string;
    framerate: number;
    static INDEPENDENT: string;
    labels: Object[];
    loop: boolean;
    mode: string;
    paused: boolean;
    static SINGLE_FRAME: string;
    startPosition: number;
    static SYNCHED: string;

    duration: number;
    static version: string;

    // methods
    advance: (time?: number)=> void;
    clone: ()=> MovieClip; // not supported
    /**
     * @deprecated - use 'currentLabel' property instead
     */
    getCurrentLabel: ()=> string;  // deprecated
    /**
     * @deprecated - use 'labels' property instead
     */

    gotoAndPlay: (positionOrLabel: string | number)=> void;
    gotoAndStop: (positionOrLabel: string | number)=> void;
    play: ()=> void;
    stop: ()=> void;
}

declare function require(string): any;
// declare module 'asflash/gfx' {
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
export interface GfxClip {
    properties: GfxProp
}

export interface GfxInitializer {
    (o: MovieClip | any): any
}

export interface InitParam {
    exportRoot: string
    canvasID: string
}
export interface Gfx {
    source: GfxClip
    addCentered: (o: InitParam, complete: GfxInitializer)=>void
}

export const clips = {
    //clips
}
