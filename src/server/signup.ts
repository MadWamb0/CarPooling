"use server";
import { db } from "~/server/db";
import { cookies } from "next/headers";
import { lucia } from "~/server/auth";
import { redirect } from "next/navigation";
import { generateId,Scrypt } from "lucia";

export interface Form{
	nome:string;
	cognome:string;
	numero:string;
	username:string;
	password:string;
	ruolo:{
		passeggero?:{
			idcard:string;
		},
		autista?:{
			numero:string;
			scadenza:string;

		}
	}
	
}

export async function signup(data:Form): Promise<ActionResult> {
	
	
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive

	const hashedPassword = await new Scrypt().hash(data.password);
	const userId = generateId(15);

	// TODO: check if username is already used
	await db.user.create({
		data: {
			id: userId,
			nome: data.nome,
			cognome: data.cognome,
			numero: data.numero,
			email: data.username,
			password: hashedPassword,
			...(data.ruolo.passeggero? {
				passeggero: {
					create: {
						idcard: data.ruolo.passeggero.idcard
					}
					
				}
			}:{
				autista:{
					create:{
						foto:"",
						patente:{
							create:{
								numero:data.ruolo.autista?.numero,
								scadenza:data.ruolo.autista?.scadenza,
								
							}
						},

					}
				}
			})
		}
    })

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}

interface ActionResult {
	error: string;
}