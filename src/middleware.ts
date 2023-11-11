import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

export const config = {
  matcher: ['/dashboard/:path*', '/auth-callback','/aimage/:path*'],
}

export default authMiddleware