'use client'
import {use} from 'react'
import {useChat} from 'ai/react'
import {MessageList} from '@/components/ui/message-list'
import {ChatInput} from '@/components/ui/chat-input'
import {dummyMessages} from '@/utils/dummy-data'
import {useEffect} from 'react'

export default function ChatPage({
	params
}: {
	params: Promise<{chatId: string}>
}) {
	// Unwrap params using React.use()
	const {chatId} = use(params)

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		setMessages,
		isLoading
	} = useChat({
		maxSteps: 2,
		id: chatId
	})

	useEffect(() => {
		if (chatId !== 'new') {
			setMessages(dummyMessages[chatId] || [])
		} else {
			setMessages([])
		}
	}, [chatId, setMessages])

	return (
		<>
			<main className="flex-1 overflow-auto">
				<div className="mx-auto max-w-3xl px-4 py-6 md:px-6 lg:px-8">
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
