export const handler = () => {
  return new Response("", {
    status: 303,
    headers:{
      location: "/videos"
    }
  })
}