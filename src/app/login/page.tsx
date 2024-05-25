"use client"
import { useState } from "react";
import { login } from "~/server/login";

export default function Page() {
    const [form,setform]=useState<{username: string,password: string}>({username:"",password:""})
	return (
		<>
			<h1>Sign in</h1>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" onChange={(e )=>{
                    setform(f=>({...f,username:e.target.value}))
                }}/>
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" onChange={(e )=>{
                    setform(f=>({...f,password:e.target.value}))
                }}/>
				<br />
				<button onClick={async()=>{
                    await login(form.username,form.password)
                }}>Continue</button>
		</>
	);
}


