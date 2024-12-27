import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Comprehensive list of Directus paths
  const directusPaths = [
    '/admin', '/auth', '/server', '/extensions', '/users', 
    '/permissions', '/fields', '/translations', '/roles', 
    '/policies', '/collections', '/presets', '/settings', 
    '/relations', '/dashboards', '/panels', '/flows', 
    '/notifications', '/files', '/assets', '/items', 
    '/folders', '/versions', '/revisions', '/comments', 
    '/shares', '/access', '/utils', '/auth/refresh',
    '/extensions/sources'
  ];
  
  // Skip middleware for Next.js internal routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if the request starts with any Directus path
  const directusPath = directusPaths.find(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (directusPath) {
    // Forward request to Directus
    const directusUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search, 
      'http://127.0.0.1:8055'
    );
    
    // Preserve and enhance headers
    const requestHeaders = new Headers(request.headers);
    
    // Set forwarding headers
    requestHeaders.set('x-forwarded-host', request.nextUrl.host);
    requestHeaders.set('x-forwarded-proto', request.nextUrl.protocol);

    // Ensure proper content negotiation
    requestHeaders.set('accept', '*/*');
    requestHeaders.set('accept-language', 'en-US,en;q=0.9');

    return NextResponse.rewrite(directusUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // For all other paths, continue to Next.js frontend
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', '/auth/:path*', '/server/:path*', 
    '/extensions/:path*', '/users/:path*', '/permissions/:path*', 
    '/fields/:path*', '/translations/:path*', '/roles/:path*', 
    '/policies/:path*', '/collections/:path*', '/presets/:path*', 
    '/settings/:path*', '/relations/:path*', '/dashboards/:path*', 
    '/panels/:path*', '/flows/:path*', '/notifications/:path*', 
    '/files/:path*', '/assets/:path*', '/items/:path*', 
    '/folders/:path*', '/versions/:path*', '/revisions/:path*', 
    '/comments/:path*', '/shares/:path*', '/access/:path*',
    '/utils/:path*', '/auth/refresh', '/extensions/sources/:path*'
  ],
};