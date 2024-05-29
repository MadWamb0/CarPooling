"use server"
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { validateRequest } from "~/server/validateRequest";
import "./style.css"
import { Rating } from "react-simple-star-rating";
import Star from "~/app/component/Star";


export default async function VisualizzaPrenotazioni(){

    const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}

    const prenotazioni=await db.prenotazioni.findMany({
        where:{
            ...(user.idAutista?{
                idAutista:user.idAutista
            }:{
                idPasseggero:user.idcard
                
            })
        },
        include:{
            ...(user.idAutista?{
                passeggero:{
                    include:{
                        user:{
                            select:{
                                id:true
                            }
                        }
                    }
                }
            }:{
                autista:{
                    include:{
                        user:{
                            select:{
                                id:true
                            }
                        }
                    }
                }
                
            })
        }
    })
    const feedbacks=await db.feedback.aggregate({
        where:{
            idUtente:{
                in: prenotazioni.map(p=>p[user.idAutista?"passeggero":"autista"].user.id)
            }
        },
    _avg:{
        voto:true
    }
    })

    
    console.log(feedbacks)
    return(
        <div className="prenotazioni-container">
            <h1>Visualizza prenotazioni</h1>
            <table className="styled-table">
                <tbody>
                    <tr>
                        <th>IDAutista</th>
                        <th>IDViaggio</th>
                        <th>IDPasseggero</th>
                        <th>Stato</th>
                        <th>Vota {user.idAutista?"Autista":"Passeggero"}</th>
                    </tr>
                        {
                            prenotazioni.map((prenotazione,k)=>(
                                <tr key={k}>
                                    <td>
                                        <p>
                                            {prenotazione.idAutista}
                                        </p>
                                        
                                    </td>
                                    <td>
                                        <p>
                                            {prenotazione.idViaggio}
                                        </p>
                                        
                                    </td>
                                    <td>
                                        <p>
                                            {prenotazione.idPasseggero}
                                        </p>
                                       
                                    </td>
                                    <td>
                                        {
                                            prenotazione.stato
                                        }
                                    </td>
                                    <td>
                                        <Star punteggio={feedbacks._avg.voto} readonly={prenotazione.stato!="Accetta"} userid={prenotazioni[k][user.idAutista?"passeggero":"autista"].user.id}></Star>
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    ) 
}
