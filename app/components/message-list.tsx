import type {Message} from 'ai'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {motion} from 'framer-motion'
import {cn} from '@/lib/utils'

type MessageListProps = {
	messages: Message[]
	isLoading?: boolean
}

export function MessageList({messages, isLoading}: MessageListProps) {
	// Add empty state
	if (messages.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center gap-2">
				<p className="text-lg font-medium">Welcome to TrailChat! ✨</p>
				<p className="text-sm text-muted-foreground">
					Ask me anything about trail running!
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{messages.map((message, index) => (
				<Message key={message.id} message={message} index={index} />
			))}

			{/* Loading indicator */}
			{isLoading && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					className="flex justify-start">
					<div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
						<div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.3s]" />
						<div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.15s]" />
						<div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" />
					</div>
				</motion.div>
			)}
		</div>
	)
}

function Message({message, index}: {message: Message; index: number}) {
	return (
		<motion.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.3, delay: index * 0.1}}
			className={cn(
				'flex',
				message.role === 'user' ? 'justify-end' : 'justify-start'
			)}>
			<div
				className={cn(
					'flex max-w-[80%] items-start gap-3 rounded-lg',
					message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
				)}>
				<Avatar className="h-8 w-8 border border-primary/10 shadow-sm">
					<AvatarImage
						src={
							message.role === 'user' ? '/user-avatar.png' : '/ai-avatar.png'
						}
						alt={message.role === 'user' ? 'User' : 'AI'}
					/>
					<AvatarFallback className="bg-secondary text-secondary-foreground">
						{message.role === 'user' ? 'U' : 'AI'}
					</AvatarFallback>
				</Avatar>

				<div
					className={cn(
						'flex flex-col space-y-1',
						message.role === 'user' ? 'items-end' : 'items-start'
					)}>
					<span className="text-sm font-medium text-muted-foreground">
						{message.role === 'user' ? 'You' : 'TrailChat AI'}
					</span>

					{message.content ? (
						<p className="whitespace-pre-wrap text-sm leading-relaxed">
							{message.content}
						</p>
					) : message.toolInvocations ? (
						<div className="text-sm">
							<p className="font-medium">Calculating heart rate zones...</p>
						</div>
					) : null}

					{/* Optional: Add timestamp */}
					<span className="text-xs text-muted-foreground/60">
						{new Date().toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
				</div>
			</div>
		</motion.div>
	)
}
