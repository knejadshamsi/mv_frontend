import {speed_indicator} from './sim_store'
import {location,coords,animationduration, frames_played, frames_passed, frame_frequesncy} from './sim_store'

let sp_ind : string, fp:number, fpa:number, ff:number, animecoords:any , duration:number
export const speed : {[key:number]:string} = {1: "fastest",2: "faster",3: "normal",4: "slower",5: "slowest"}

speed_indicator.subscribe((value)=> {sp_ind = value})
frames_played.subscribe((value)=> {fp = value})
frames_passed.subscribe((value)=> {fpa= value})
frame_frequesncy.subscribe((value)=> {ff = value})
animationduration.subscribe((value)=> {duration = value})
coords.subscribe((value)=> {animecoords = value})

let anime: any;

interface FunctionMap {
    [key: string]: {[key:string]:string};
}

export const function_map : FunctionMap = {
    "1": {"SlowDown" : "s1SD","Play" : "s1PL","Pause": "s1PA","SpeedUP": "s1SU","Reset" : "s1RE"},
    "2":{"SlowDown" : "s2SD","Play" : "s2PL","Pause": "s2PA","SpeedUP": "s2SU","Reset" : "s2RE"},
    "3": {"SlowDown" : "s3SD","Play" : "s3PL","Pause": "s3PA","SpeedUP": "s3SU","Reset" : "s3RE"}
}


export function Animation() {
    fpa++
    if (fpa%ff==0) {
        fp++
        location.set(animecoords[fp])
    }
    if (fpa < (duration-1)) {
        anime = requestAnimationFrame(Animation)

    }
}

export function s1SD() {
    if (ff < 5){
        ff++
        frame_frequesncy.set(ff)
        speed_indicator.set(speed[ff])
    }
}

export function s1PL() {
    console.log("IT WORKS!!!!")
    return new Promise((resolve)=>{
        Animation();
        //resolve()
    })
}

export function s1PA() {
    cancelAnimationFrame(anime)
}

export function s1SU() {
    if (ff > 1) {
        ff = ff - 1
        frame_frequesncy.set(ff)
        speed_indicator.set(speed[ff])
    }

}
export function s1RE() {
    cancelAnimationFrame(anime)
    fpa = 0
    fp = 0
}