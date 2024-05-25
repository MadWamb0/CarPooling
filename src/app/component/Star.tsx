"use client"
import { Rating } from "react-simple-star-rating";
import aggiungiRecensione from "~/server/aggiungiRecensione";

export default function Star({punteggio,readonly,userid}:stardata){
    return(<Rating initialValue={punteggio} readonly={readonly} onClick={async(stars)=>{
        console.log(userid)
        await aggiungiRecensione(userid,stars)
    }}></Rating>)
}

interface stardata{
    punteggio:number
    readonly:boolean
    userid:string
    
}