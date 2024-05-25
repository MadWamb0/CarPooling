import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { validateRequest } from "~/server/validateRequest";

export default async function NuovoVeicolo(){
    
    const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}

    async function aggiungiVeicolo(formdata:FormData){
        "use server"
        try{
            await db.user.update({
                where:{id:user!.id},
                data:{
                    autista:{
                        update:{
                            veicolo:{
                                create:{
                                    produttore:formdata.get("marca") as string,
                                    targa:formdata.get("targa") as string,
                                    posti:parseInt(formdata.get("posti") as string),

                                }
                            }
                        }
                    }
                }
            })
        }catch(e){
            console.error(e)
        }
    }

    return (
        <div>
            <h1>
                Aggiungi veicolo
            </h1>
            <form action={aggiungiVeicolo}>
                <input name="marca" type="text" placeholder="Marca"/>
                <input name="targa" type="text" placeholder="Targa"/>
                <input name="posti" type="number" placeholder="Posti senza conducente"/>
                <button type="submit">Invia</button>
            </form>
        </div>
    ) 
}
