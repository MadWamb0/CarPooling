import { Prenotazioni } from "@prisma/client"
import { db } from "./db"

export default async function ottieniPrenotazioni(idAutista:number){
    try {
        const prenotazioni=await db.prenotazioni.findMany({
            where:{
                idAutista:idAutista,
                stato:"Attesa"
            },
            include:{
                viaggio:true,
                passeggero:{
                    include:{
                        user:{
                            select:{
                                nome:true,
                                cognome:true,
                                email:true,
                            }
                        }
                    }
                }
            }
        })
        return prenotazioni
    } catch (error) {
        console.log(error)
    }
}