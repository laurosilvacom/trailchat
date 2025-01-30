'use client'

import {useState, useEffect} from 'react'
import {useChat} from 'ai/react'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Sidebar} from './components/sidebar'
import {MessageList} from './components/message-list'
import {ChatInput} from './components/chat-input'
import {dummyMessages} from './utils/dummy-data'

export default function ChatPage() {
	const {messages, setMessages, append} = useChat()
	const [selectedChat, setSelectedChat] = useState('new')
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	useEffect(() => {
		if (selectedChat !== 'new') {
			setMessages(dummyMessages[selectedChat] || [])
		} else {
			setMessages([])
		}
	}, [selectedChat, setMessages])

	const handleSendMessage = (message: string) => {
		append({role: 'user', content: message})
	}

	const handleSelectChat = (chatId: string) => {
		setSelectedChat(chatId)
		setIsSidebarOpen(false) // Close sidebar on mobile after selection
	}

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

			{/* Sidebar */}
			<div
				className={`${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} fixed inset-y-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
				<Sidebar selectedChat={selectedChat} onSelectChat={handleSelectChat} />
			</div>

			{/* Overlay for mobile */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 md:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Main Content */}
			<div className="flex flex-1 flex-col">
				<main className="flex-1 overflow-auto">
					<div className="mx-auto max-w-3xl px-4 py-6 md:px-6 lg:px-8">
						<MessageList messages={messages} />
					</div>
				</main>

				<footer className="border-t p-4">
					<div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
						<ChatInput onSubmit={handleSendMessage} />
						<p className="mt-2 text-center text-xs text-muted-foreground">
							Like that energy gel from 2019 in your pack, take this advice with
							a grain of salt.
						</p>
					</div>
				</footer>
			</div>
		</div>
	)
}
