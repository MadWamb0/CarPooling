import { Prenotazioni, User } from "@prisma/client"
import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "~/server/logout";
import ottieniPrenotazioni from "~/server/ottieniPrenotazioni";
import "./style.css"
import { ottieniViaggi } from "~/server/ottieniViaggi"
import { validateRequest } from "~/server/validateRequest"



export default async function Dashboard({children}:{children:React.ReactNode}){
    const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
    
    return(
        <div className="dashboard-container">
            <h1>
                Benvenuto {user.nome}
                {user.cognome} !
                <br />
                {user.idcard?"Passeggero":"Autista"} 
                
            </h1>
            <form action={logout} className="logout-form">
                <button className="button">
                    Disconnetti
                </button>
            </form>
            <div className="links-container">
				{
                    user.idAutista?(
                        <>
                            <Link href="/dashboard/nuovoviaggio" className="link">
                                Crea un nuovo viaggio
                            </Link>
                            <Link href="/dashboard/nuovoveicolo" className="link">
                                Aggiungi un veicolo
                            </Link>
                            <Link href="/dashboard/visualizzaprenotazioni" className="link">
                                Visualizza le prenotazioni
                            </Link>
                        </>
                    ):(
                        <>
                            <Link href="/dashboard/visualizzaprenotazioni" className="link">
                                Visualizza le prenotazioni
                            </Link>
                        </>
                    )
                }
			</div>
            {children}
            
        </div>
    )
}