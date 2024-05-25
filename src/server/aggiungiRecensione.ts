"use server"
import { revalidatePath } from "next/cache";
import { db } from "./db";

export default async function aggiungiRecensione(userid:string,punteggio:number) {
    await db.user.update({
        where:{
            id:userid
        },
        data:{
            feedback:{
                create:{
                    voto:punteggio,commento:""
                }
            }
        }
    })
    revalidatePath("/dashboard/visualizzaprenotazioni")
}