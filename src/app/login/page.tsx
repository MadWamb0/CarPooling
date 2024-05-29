"use client"
import { useState } from "react";
import { login } from "~/server/login";
import "./style.css"

export default function Page() {
    const [form,setform]=useState<{username: string,password: string}>({username:"",password:""})
	return (
		<div className="container">
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
				<button className="bordi" onClick={async()=>{
                    await login(form.username,form.password)
                }}>Continue</button>
		</div>
	);
}


