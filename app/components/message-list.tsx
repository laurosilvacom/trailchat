import type {Message} from 'ai'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {motion} from 'framer-motion'
import {cn} from '@/lib/utils'

export function MessageList({messages}: {messages: Message[]}) {
	return (
		<div className="space-y-6">
			{messages.map((message, index) => (
				<motion.div
					key={message.id}
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
									message.role === 'user'
										? '/user-avatar.png'
										: '/ai-avatar.png'
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

							<div
								className={cn(
									'rounded-lg px-4 py-2 shadow-sm',
									message.role === 'user'
										? 'bg-primary text-primary-foreground'
										: 'bg-secondary text-secondary-foreground'
								)}>
								<p className="whitespace-pre-wrap text-sm leading-relaxed">
									{message.content}
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}
