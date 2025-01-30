import type {Metadata} from 'next'
import {Geist_Mono} from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono'
})

export const metadata: Metadata = {
	title: 'Trailchat',
	description: 'A modern chat application for trail runners!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistMono.variable} font-sans antialiased`}>
				{children}
			</body>
		</html>
	)
}
