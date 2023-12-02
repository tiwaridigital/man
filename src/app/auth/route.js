export async function GET(req, response) {
  const { action, name } = req.body
  console.log('naval body', req.body)
  console.log('name', name)
  return Response.json({ name: 'response.redirect' })
}
