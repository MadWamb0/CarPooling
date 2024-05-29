import { redirect } from "next/navigation";
import { db } from "~/server/db"
import { validateRequest } from "~/server/validateRequest";
import "./style.css"

const citta=[
    "Roma",
    "Milano",
    "Bari",
    "Napoli",
    "Torino",
    "Palermo",
    "Bologna",
    "Firenze",
    "Genova",
    "Catania",
]

export default async function NuovoViaggio(){
    
    const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}

    async function creaViaggio(formdata:FormData){

        "use server"
        try{
            const veicolo=await db.veicolo.findUnique({
                where:{
                    targa:formdata.get("veicoloselezionato") as string
                }
            })
            await db.user.update({
                where:{id:user!.id},
                data:{
                    autista:{
                        update:{
                            viaggio:{
                                create:{
                                    postiDisponibili:veicolo!.posti,
                                    Partenza:formdata.get("partenza") as string,
                                    Destinazione:formdata.get("destinazione") as string,
                                    dataPartenza:`${formdata.get("datapartenza")} ${formdata.get("orapartenza")}`,
                                    contributo:formdata.get("prezzo") as string,
                                    tempoPercorrenza:formdata.get("tempo") as string,
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

    const veicoli=await db.veicolo.findMany({
        where:{
            idAutista:user.idAutista as number,
        }
    })

    return(
        <div className="form-container">
            <h1>Nuovo Viaggio</h1>
            <p>Inserisci i dati del viaggio</p>
            <form action={creaViaggio} className="styled-form">
                <select required name="partenza" className="styled-select">
                    <option disabled defaultValue>
                        Seleziona la città di partenza
                    </option>
                    {citta.map((citta,k)=><option value={citta} key={k}>{citta}</option>)}
                </select>
                <select required name="destinazione" className="styled-select">
                    <option disabled defaultValue>
                        Seleziona la città di destinazione
                    </option>

                    {citta.map((citta,k)=><option value={citta} key={k}>{citta}</option>)}

                </select>
                <select name="veicoloselezionato" className="styled-select">
                    <option disabled defaultValue>
                        Seleziona un veicolo 
                    </option>

                    {veicoli.map((veicolo, k)=><option value={veicolo.targa} key={k}>{veicolo.produttore}</option>)}

                </select>
                <input required name="tempo" type="time" placeholder="Tempo Percorrenza" className="styled-input"></input>
                <input required name="orapartenza" type="time" placeholder="Orario di partenza" className="styled-input"></input>
                <input required name="datapartenza" type="date" placeholder="Data" className="styled-input"></input>
                <input required name="prezzo" type="number" placeholder="Prezzo" className="styled-input"></input>
                
                <button type="submit" className="styled-button">Invia</button>
            </form>
        </div>
    )
}

