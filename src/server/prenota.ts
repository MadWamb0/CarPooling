"use server"
import { revalidatePath } from "next/cache"
import { db } from "./db"

export default async function prenota(form:FormData){
try {
    const idViaggio=form.get("idViaggio") as string
    const idAutista=form.get("idAutista") as string
    const idPasseggero=form.get("idPasseggero") as string
    await db.viaggio.update({
        where:{
            id:parseInt(idViaggio),
            idAutista:parseInt(idAutista),
        },
        data:{
            prenotazioni:{
                create:{
                    stato:"Attesa",
                    idAutista:parseInt(idAutista),
                    idPasseggero:idPasseggero,
                }
            }
        }
    })
    revalidatePath("/dashboard")
} catch (error) {
    console.log(error)
}
}