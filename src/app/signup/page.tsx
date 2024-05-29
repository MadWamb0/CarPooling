"use client"
import { useState } from "react";
import { Form, signup } from "~/server/signup";
import "./style.css"

export default function Page() {
    
    const [form,setform]=useState<Form>({username:"",password:"",ruolo:{},nome:"",cognome:"",numero:""})
	const [tipoUtente,setUtente]=useState<"passeggero"|"autista">()
	return (
		<div className="container">
			<h1>Crea un account</h1>
				<input type="text" name="nome" placeholder="Nome" onChange={(e )=>{
                    setform(f=>({...f,nome:e.target.value}))
                }}/>
				<br />
				<input type="text" name="cognome" placeholder="Cognome" onChange={(e )=>{
                    setform(f=>({...f,cognome:e.target.value}))
                }}/>
				<br />
				<input type="text" name="numero" placeholder="Numero di telefono" onChange={(e )=>{
                    setform(f=>({...f,numero:e.target.value}))
                }}/>
				<br />
				<input required name="username" placeholder="Username" id="username" onChange={(e )=>{
                    setform(f=>({...f,username:e.target.value}))
                    
                }}/>
				<br />
				<input required type="password" placeholder="Password" name="password" id="password" onChange={(e )=>{
                    setform(f=>({...f,password:e.target.value}))
                }}/>

				<br />
				<select required className="bordi" name="tipoUtente" onChange={(e )=>{
					setUtente(e.target.value as "passeggero"|"autista")
					console.log(e.target.value)
				}}>
					<option>
						Seleziona un campo
					</option>
					<option value="passeggero">
						Passeggero
					</option>
					<option value="autista">
						Autista
					</option>
				</select>
				{
					tipoUtente==="passeggero"?(
						<div>
							<input required type="text" placeholder="ID Card" name="idcard" onChange={(e )=>{
								setform(f=>({...f, ruolo:{ passeggero:{idcard:e.target.value}}}))
							}}/>
						</div>
					):tipoUtente==="autista"&&(
						<div>
							<input required name="numeroPatente" placeholder="Numero Patente" onChange={(e )=>{
								setform(f=>({...f, ruolo:{ autista:{...f.ruolo.autista!,numero:e.target.value}}}))
							}}/>
							<input required name="scandenza" type="date" placeholder="Scadenza Patente" onChange={(e )=>{
								setform(f=>({...f, ruolo:{ autista:{...f.ruolo.autista!,scadenza:e.target.value}}}))
							}}/>
						</div>
						
					)
				}
				<br />
				<button className="bordi" onClick={async()=>{
                    await signup(form)
                }}>Continue</button>
			
		</div>
	);
}

