import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Makaan - Real Estate HTML Template',
  description: 'Find your perfect home with Makaan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap Icons */}
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" 
          rel="stylesheet"
        />
        
        {/* Font Awesome */}
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" 
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}