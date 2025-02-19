'use client'
import {useChat} from 'ai/react'
import {MessageList} from '@/components/ui/message-list'
import {ChatInput} from '@/components/ui/chat-input'

export default function ChatHome() {
	const {messages, input, handleInputChange, handleSubmit, isLoading} = useChat(
		{
			maxSteps: 2
		}
	)

	return (
		<>
			<main className="flex-1 overflow-auto">
				<div className="mx-auto max-w-4xl px-4 py-6 md:px-6 lg:px-8">
					<MessageList messages={messages} isLoading={isLoading} />
				</div>
			</main>

			<footer className="border-t p-4">
				<div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
					<ChatInput
						input={input}
						handleInputChange={handleInputChange}
						handleSubmit={handleSubmit}
					/>
					<p className="mt-2 text-center text-xs text-muted-foreground">
						Like that energy gel from 2019 in your pack, take this advice with a
						grain of salt.
					</p>
				</div>
			</footer>
		</>
	)
}
