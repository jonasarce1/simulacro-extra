import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Login from "../components/Login.tsx";
import { RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  skipInheritedLayouts: true, 
};

type Data = {
    message: string
}

export const handler:Handlers<Data> = {
    POST: async(req:Request, ctx:FreshContext<unknown, Data>) => {
        const form = await req.formData();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();

        const API_URL = Deno.env.get("API_URL");

        const JWT_SECRET = Deno.env.get("JWT_SECRET");

        if(!API_URL || !JWT_SECRET){
            throw new Error("Error al coger las variables de entonro")
        }

        const response = await fetch(`${API_URL}/checkuser`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if(response.status === 200){
            const data = await response.json();

            console.log(data.email)
            console.log(data.password)

            return new Response("", {
                status: 307,
                headers:{
                    location: "/videos"
                }
            })
        }else{
            return ctx.render({message: "Incorrect credentials or user does not exist"});
        }
    }
}

const Page = (props: PageProps<Data>) => {
    return(
        <Login message={props.data?.message}/>
    )
}

export default Page;