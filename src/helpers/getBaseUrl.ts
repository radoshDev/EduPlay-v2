function getBaseUrl() {
  if (import.meta.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${import.meta.env.VERCEL_URL}`
  if (import.meta.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${import.meta.env.RENDER_INTERNAL_HOSTNAME}:${
      import.meta.env.PORT
    }`
  // assume localhost
  return `http://localhost:${import.meta.env.VITE_PORT ?? 3000}`
}

export default getBaseUrl
