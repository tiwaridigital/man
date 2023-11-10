import { Inter } from 'next/font/google'
import './globals.css'
import '../index.scss'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Manga Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }){
  return (
    <html lang='en'>
    <body className={inter.className}>
    {/*<Header />*/}
    {children}
    <Footer/>
    </body>
    </html>
  )
}
