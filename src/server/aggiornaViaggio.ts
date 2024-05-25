"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"

export default async function aggiornaViaggio(form:FormData) {
    const idPasseggero=form.get("idPasseggero")
    const idPrenotazione=form.get("idPrenotazione")
    const idAutista=form.get("idAutista")
    const stato=form.get("stato")

    await db.prenotazioni.update({
        where:{
            id:parseInt(idPrenotazione),idPasseggero:idPasseggero,idAutista:parseInt(idAutista),stato:"Attesa"
        },data:{
            stato:stato,
            ...(stato==="Accetta"&&{
                viaggio:{update:{
                    where:{
                        idAutista:parseInt(idAutista)
                    },
                    data:{
                        postiDisponibili:{
                            decrement:1
                        }
                    }
                }}
            })
        }
    })
    revalidatePath("/dashboard")
}