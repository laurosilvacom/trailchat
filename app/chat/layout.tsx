'use client'
import {useState} from 'react'
import {Menu, X} from 'lucide-react'
import {Button} from './../components/ui/button'
import {Sidebar} from './../components/ui/sidebar'
import {cn} from '@/lib/utils'

export default function ChatLayout({children}: {children: React.ReactNode}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className="relative flex h-screen bg-background">
			{/* Mobile Menu Button */}
			<Button
				variant="ghost"
				size="icon"
				className="absolute left-4 top-4 z-50 md:hidden"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
				{isSidebarOpen ? (
					<X className="h-6 w-6" />
				) : (
					<Menu className="h-6 w-6" />
				)}
			</Button>

			{/* Sidebar with overlay click handler */}
			<div
				className={cn(
					'fixed inset-y-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				)}>
				<Sidebar />
			</div>

			{/* Overlay */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 md:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Main Content */}
			<div className="flex flex-1 flex-col">{children}</div>
		</div>
	)
}
