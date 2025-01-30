import {Button} from '@/components/ui/button'
import {PlusCircle, MessageSquare, ChevronRight, CableCar} from 'lucide-react'

const dummyChats = [
	{id: 'chat1', title: 'ChatGPT Basics'},
	{id: 'chat2', title: 'Creative Writing Tips'},
	{id: 'chat3', title: 'Python Programming'},
	{id: 'chat4', title: 'Travel Recommendations'}
]

export function Sidebar({
	selectedChat,
	onSelectChat
}: {
	selectedChat: string
	onSelectChat: (chatId: string) => void
}) {
	return (
		<aside className="flex h-screen w-64 flex-col bg-primary p-2 text-primary-foreground shadow-[1px_0_5px_0_rgba(0,0,0,0.1)]">
			{/* Rest of your code stays the same */}
			<div className="mb-6 flex items-center px-2">
				<CableCar className="h-6 w-6 text-primary-foreground" />
				<span className="ml-2 text-xl font-bold">TrailChat</span>
			</div>

			<Button
				variant="outline"
				className="mb-2 w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-secondary hover:text-primary-foreground active:bg-secondary active:text-primary-foreground"
				onClick={() => onSelectChat('new')}>
				<PlusCircle className="mr-2 h-4 w-4" /> New Chat
			</Button>

			<nav className="flex-1 overflow-y-auto">
				<ul className="space-y-0.5">
					{dummyChats.map((chat) => (
						<li key={chat.id}>
							<Button
								variant="ghost"
								className={`w-full justify-start truncate px-3 py-3 text-sm text-primary-foreground hover:bg-secondary/40 hover:text-primary-foreground focus:bg-secondary focus:text-primary-foreground active:bg-secondary active:text-primary-foreground ${
									selectedChat === chat.id
										? 'bg-secondary text-primary-foreground'
										: ''
								}`}
								onClick={() => onSelectChat(chat.id)}>
								<MessageSquare className="mr-2 h-4 w-4" />
								<span>{chat.title}</span>
							</Button>
						</li>
					))}
				</ul>
			</nav>

			<div className="mt-auto border-t border-muted-foreground/20 pt-2">
				<Button
					variant="ghost"
					className="w-full justify-between text-sm text-primary-foreground hover:bg-secondary hover:text-primary-foreground active:bg-secondary active:text-primary-foreground">
					Upgrade to Plus
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</aside>
	)
}
