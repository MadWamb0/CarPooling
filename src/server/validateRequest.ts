
import { cookies } from "next/headers";
import { cache } from "react";

import type { Session } from "lucia";
import { lucia } from "./auth";
import { db } from "./db";
import { User } from "@prisma/client"

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		if (!result.user) {return {user:null,session:null}}
		const giglo=await db.user.findUnique({
            where:{
                id:result.user!.id
            }
        })
        return {
            user:giglo as User,
			session:result.session,
        }        
	}
);