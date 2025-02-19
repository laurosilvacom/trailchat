'use client'
import {usePathname, useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {PlusCircle, MessageSquare, CableCar} from 'lucide-react'
import {dummyMessages} from '@/utils/dummy-data'
import Link from 'next/link'
import {SignedIn, UserButton} from '@clerk/nextjs'

// Convert dummyMessages to array of chat objects
const dummyChats = Object.entries(dummyMessages).map(([id, messages]) => {
	// Find the first user message to use as title
	const firstUserMessage = messages.find((msg) => msg.role === 'user')
	return {
		id,
		// Use first user message or fallback to a default title
		title: firstUserMessage?.content || 'New Chat'
	}
})

export function Sidebar() {
	const router = useRouter()
	const pathname = usePathname()
	const currentChatId = pathname.split('/').pop()

	const handleSelectChat = (chatId: string) => {
		router.push(`/chat/${chatId}`)
	}

	return (
		<aside className="flex h-screen w-64 flex-col bg-primary p-2 text-primary-foreground shadow-[1px_0_5px_0_rgba(0,0,0,0.1)]">
			<div className="mb-6 flex items-center px-2">
				<Link
					href="/"
					className="mb-6 flex items-center px-2 transition-opacity hover:opacity-80">
					<CableCar className="h-6 w-6 text-primary-foreground" />
					<span className="ml-2 text-xl font-bold">TrailChat</span>
				</Link>
			</div>

			<Button
				variant="ghost"
				className="mb-10"
				onClick={() => handleSelectChat('new')}>
				<PlusCircle className="mr-2 h-4 w-4" /> New Chat
			</Button>

			<nav className="flex-1 overflow-y-auto">
				<ul className="space-y-0.5">
					{dummyChats.map((chat) => (
						<li key={chat.id}>
							<Button
								variant="ghost"
								className={`w-full ${
									currentChatId === chat.id
										? 'bg-background text-foreground'
										: ''
								}`}
								onClick={() => handleSelectChat(chat.id)}>
								<MessageSquare className="mr-2 h-4 w-4" />
								<div className="flex flex-col items-start text-left">
									<span className="max-w-[180px] truncate text-xs font-medium">
										{chat.title}
									</span>
								</div>
							</Button>
						</li>
					))}
				</ul>
			</nav>

			<div className="mt-auto border-t border-muted-foreground/20 pt-2">
				<SignedIn>
					<div className="flex w-full items-center gap-2 p-2">
						<UserButton
							afterSignOutUrl="/"
							appearance={{
								elements: {
									userButtonBox: 'w-full',
									userButtonTrigger:
										'w-full flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-muted/50 transition-colors',
									userButtonAvatarBox: 'h-8 w-8',
									userButtonAvatarImage: 'rounded-full',
									userButtonOuterIdentifier:
										'text-sm text-muted-foreground font-medium'
								}
							}}
						/>
					</div>
				</SignedIn>
			</div>
		</aside>
	)
}
