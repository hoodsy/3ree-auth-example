// isAuthenticated
// ===============
// Route / respond to request
// based on Passport cookie's auth status
// ---------------
export function requireAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    next()
  else if (req.url.includes('/api/'))
    res.status(401).send('Unauthorized request.')
  else
    res.status(302).redirect('/login')
}
