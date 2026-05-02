import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const url = req.nextUrl;
  
  // Get hostname of request
  const hostname = req.headers.get("host") || "";
  
  // 1. Detect the root domain dynamically
  let localDomain = "";
  const rootEnv = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";
  
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // For localhost, root is the base (e.g., localhost:3000)
    const parts = hostname.split('.');
    localDomain = parts.length > 1 ? parts.slice(1).join('.') : hostname;
  } else if (rootEnv && hostname.endsWith(rootEnv)) {
    // If env var is set and matches current host suffix
    localDomain = rootEnv;
  } else {
    // Production/Vercel fallback: extract root from hostname
    const parts = hostname.split('.');
    if (hostname.includes("vercel.app")) {
      // tenant.project.vercel.app -> project.vercel.app
      localDomain = parts.length > 3 ? parts.slice(1).join('.') : hostname;
    } else {
      // tenant.domain.com -> domain.com
      localDomain = parts.length >= 3 ? parts.slice(-2).join('.') : hostname;
    }
  }

  // Final fallback
  if (!localDomain) localDomain = "localhost:3000";
  
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // 1. Handle root domain and specific bypasses
  if (
    hostname === localDomain ||
    // Skip subdomains for initial Vercel branch previews (except if it matches our localDomain pattern)
    (hostname.includes("vercel.app") && !hostname.endsWith(`.${localDomain}`) && !hostname.startsWith('super-admin.'))
  ) {
    return NextResponse.next();
  }

  // 2. Handle subdomains (Super Admin and Tenants)
  if (hostname.endsWith(`.${localDomain}`)) {
    const tenant = hostname.replace(`.${localDomain}`, "").toLowerCase();
    
    // Special case: Super Admin Subdomain
    if (tenant === 'super-admin') {
      return NextResponse.rewrite(new URL(`/super-admin${path === "/" ? "" : path}`, req.url));
    }

    // Generic Tenant Subdomain
    if (tenant !== 'www' && tenant !== 'admin') {
      const rewriteUrl = new URL(`/app/${tenant}${path === "/" ? "" : path}`, req.url);
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
