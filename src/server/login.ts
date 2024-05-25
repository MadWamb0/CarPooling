"use server";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "./auth";
import { redirect } from "next/navigation";
import { db } from "./db";
import { Scrypt } from "lucia";

export async function login(username:string, password:string): Promise<ActionResult> {

	const existingUser = await db.user.findUnique({
        where: {    
            email:username
        }
    })
	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is none-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Incorrect username or password"
		};
	}

	const validPassword = await new Scrypt().verify(existingUser.password, password);
	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/dashboard");
}

interface ActionResult {
	error: string;
}