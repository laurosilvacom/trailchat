import type {Metadata} from 'next'
import {GeistSans} from 'geist/font/sans'
import {GeistMono} from 'geist/font/mono'
import {ClerkProvider} from '@clerk/nextjs'

import './globals.css'

export const metadata: Metadata = {
	title: 'Trailchat',
	description: 'A modern AI chat application for trail runners!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
