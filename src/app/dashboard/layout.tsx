

import { Prenotazioni, User } from "@prisma/client"
import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "~/server/logout";
import ottieniPrenotazioni from "~/server/ottieniPrenotazioni";

import { ottieniViaggi } from "~/server/ottieniViaggi"
import { validateRequest } from "~/server/validateRequest"



export default async function Dashboard({children}:{children:React.ReactNode}){
    const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
    
    return(
        <div>
            <h1>
                {user.nome}
                {user.cognome}
                {user.numero}
                {user.idcard?"passeggero":"autista"} 
                
            </h1>
            <form action={logout}>
                <button>
                    Disconnetti
                </button>
            </form>
            <div>
				{
                    user.idAutista?(
                        <>
                            <Link href="/dashboard/nuovoviaggio">
                                Crea un nuovo viaggio
                            </Link>
                            <Link href="/dashboard/nuovoveicolo">
                                Aggiungi un veicolo
                            </Link>
                            <Link href="/dashboard/visualizzaprenotazioni">
                                Visualizza le prenotazioni
                            </Link>
                        </>
                    ):(
                        <>
                            <Link href="/dashboard/visualizzaprenotazioni">
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