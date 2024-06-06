import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { State } from "../types.ts";
import jwt from "jsonwebtoken";

export async function handler(req:Request, ctx:FreshContext<State>) {
    if(ctx.destination !== "route"){
        const resp = await ctx.next();
        return resp;
    }

    if(ctx.route === "/login" || ctx.route === "/register"){
        const resp = await ctx.next();
        return resp;
    }

    const cookies = getCookies(req.headers);
    const auth = cookies.auth;

    if(!auth){
        return new Response("", {
            status:307,
            headers:{
                location: "/login"
            }
        })
    }

    const payload = jwt.verify(Deno.env.get("JWT_SECRET"));

    if(!payload){
        return new Response("", {
            status:307,
            headers:{
                location: "/login"
            }
        })
    }

    ctx.state.id = payload.id;
    ctx.state.email = payload.email;
    ctx.state.name = payload.mail;

    const resp = await ctx.next();
    return resp;
}