import {type Message} from 'ai'
import {motion} from 'framer-motion'
import {highlight} from 'sugar-high'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {cn} from '@/lib/utils'

type MessageListProps = {
	messages: Message[]
	isLoading?: boolean
}

type MessageSegment = {
	type: 'text' | 'code'
	content: string
	language?: string // Make it optional since text segments won't have it
}

function processMarkdown(text: string): string {
	// Handle headings: ### Heading -> <h3>Heading</h3>
	text = text.replace(
		/###\s+(.*?)(?:\n|$)/g,
		'<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
	)

	// Handle bold text: **text** -> <strong>text</strong>
	text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

	// Handle italic text: *text* -> <em>text</em>
	text = text.replace(/\*(.*?)\*/g, '<em>$1</em>')

	// Handle links: [text](url) -> <a href="url">text</a>
	text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')

	// Handle line breaks
	text = text.replace(/\n/g, '<br />')

	return text
}

function processCodeBlocks(content: string): MessageSegment[] {
	const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
	let lastIndex = 0
	const segments: MessageSegment[] = []
	let match: RegExpExecArray | null

	while ((match = codeBlockRegex.exec(content)) !== null) {
		// Add text before code block
		if (match.index > lastIndex) {
			segments.push({
				type: 'text',
				content: content.slice(lastIndex, match.index)
			})
		}

		// Extract language and code
		const language = match[1]?.toLowerCase() ?? 'txt'
		const code = match[2]?.trim() ?? ''

		segments.push({
			type: 'code',
			content: highlight(code),
			language // Store the language information
		})

		lastIndex = match.index + match[0].length
	}

	// Add remaining text
	if (lastIndex < content.length) {
		segments.push({
			type: 'text',
			content: content.slice(lastIndex)
		})
	}

	return segments
}

export function MessageList({messages, isLoading}: MessageListProps) {
	if (messages.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center gap-2">
				<p className="text-lg font-medium">Welcome to TrailChat!</p>
				<p className="text-sm text-muted-foreground">
					Ask me anything about running!
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{messages.map((message, index) => (
				<Message key={message.id} message={message} index={index} />
			))}

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
						<div
							className={cn(
								'prose dark:prose-invert',
								message.role === 'user' ? 'text-right' : 'text-left'
							)}>
							{processCodeBlocks(message.content).map((segment, i) =>
								segment.type === 'code' ? (
									<pre key={i} className="max-w-4xl overflow-x-auto">
										<code dangerouslySetInnerHTML={{__html: segment.content}} />
									</pre>
								) : (
									<div
										key={i}
										dangerouslySetInnerHTML={{
											__html: processMarkdown(segment.content)
										}}
										className="whitespace-pre-wrap"
									/>
								)
							)}
						</div>
					) : null}

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
