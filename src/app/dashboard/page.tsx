import { redirect } from "next/navigation";
import { Prenotazioni, Viaggio } from "~/giglolan";
import aggiornaViaggio from "~/server/aggiornaViaggio";
import { logout } from "~/server/logout";
import ottieniPrenotazioni from "~/server/ottieniPrenotazioni";
import { ottieniViaggi } from "~/server/ottieniViaggi";
import prenota from "~/server/prenota";
import { validateRequest } from "~/server/validateRequest";
import "./styletable.css"

export default async function dashboard(){
    const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}

    const data:Prenotazioni[]|Viaggio[]=user.idAutista?
    await ottieniPrenotazioni(user.idAutista):await ottieniViaggi(user.idcard as string) 
    console.log(data)
    
    return (
        <div className="dashboard-container">
            <table border={1} className="styled-table">
                <tbody>
                    <tr>
                        <th>
                            {user.idAutista?"passeggero":"autista"}
                        </th>
                        <th>
                            Stato
                        </th>
                        <th>
                            Azioni
                        </th>
                    </tr>
                    {
                        user.idAutista?(data as Prenotazioni[]).map((d,k)=>(
                            <tr key={k}>
                                <td>
                                    {
                                        `${d.passeggero.user?.nome} ${d.passeggero.user?.cognome}`
                                    }
                                </td>
                                <td>
                                    {
                                        d.stato
                                    }
                                </td>
                                <td>
                                    <form action={aggiornaViaggio}>
                                        <select name="stato">
                                            <option value="Accetta">Accetta</option>
                                            <option value="Rifiuta">Rifiuta</option>
                                        </select>
                                        <input type="text" name="idPasseggero" readOnly defaultValue={d.idPasseggero} hidden/>
                                        <input type="text" name="idPrenotazione" readOnly defaultValue={d.id} hidden/>
                                        <input type="text" name="idAutista" readOnly defaultValue={d.idAutista} hidden/>
                                        <button className="button">Aggiorna</button>    
                                    </form>
                                </td>
                            </tr>
                        )):(data as Viaggio[]).map((d,k)=>(
                            <tr key={k}>
                                <td>
                                    {
                                        `${d.autista.user?.nome} ${d.autista.user?.cognome}`
                                    }
                                </td>
                                <td>
                                    {
                                        d.postiDisponibili
                                    }
                                </td>
                                <td>
                                    <form action={prenota}>
                                        <input type="text" name="idPasseggero" defaultValue={user!.idcard as string} hidden/>
                                        <input type="text" name="idViaggio" defaultValue={d.id} hidden/>
                                        <input type="text" name="idAutista" defaultValue={d.autista.id} hidden/>
                                        <button className="button">Prenota un posto</button>    
                                    </form>  
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    
    
}