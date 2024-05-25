"use server"
import { db } from "./db";

export async function ottieniViaggi(idcard:string){
    const viaggi=await db.viaggio.findMany({
        where:{
            NOT:{
                prenotazioni:{
                    some:{
                        passeggero:{idcard:idcard}
                    }
                }
            }
        },
        include:{
            autista:{
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
    return viaggi;
}