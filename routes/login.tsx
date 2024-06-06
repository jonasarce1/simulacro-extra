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

        return ctx.render()
    }
}

const Page = (props: PageProps<Data>) => {
    return(
        <Login message={props.data?.message}/>
    )
}

export default Page;