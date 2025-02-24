'use client'
import {use} from 'react'
import {useChat} from 'ai/react'
import {MessageList} from '@/components/ui/message-list'
import {ChatInput} from '@/components/ui/chat-input'
import {dummyMessages} from '@/utils/dummy-data'
import {useEffect} from 'react'
import * as Sentry from '@sentry/nextjs'
import {ChatErrorBoundary} from '@/components/ui/chat-error-boundary'

/**
 * Development-only component for testing error scenarios
 * Useful during development to:
 * 1. Verify Sentry is capturing errors correctly
 * 2. Test error boundary behavior
 * 3. Simulate real user scenarios that might be hard to reproduce
 */
const TestSentryButton = () => {
	// Only show in development
	if (process.env.NODE_ENV !== 'development') return null

	const testCases = {
		// Test case for AI response timeout
		aiTimeout: async () => {
			Sentry.setContext('ai_request', {
				model: 'gpt-4o-mini',
				timeout: 30000
			})
			throw new Error('AI response timeout - Request exceeded 30s limit')
		},

		// Test case for invalid training data
		invalidData: async () => {
			const invalidData = {
				heartRate: -50,
				distance: -10
			}
			Sentry.setContext('training_data', invalidData)
			throw new Error('Invalid training metrics detected')
		},

		// Test case for rate limiting
		rateLimited: async () => {
			Sentry.setContext('api_limits', {
				remaining: 0,
				resetAt: new Date().toISOString()
			})
			throw new Error('API rate limit exceeded')
		}
	}

	const handleTestError = async (errorType: keyof typeof testCases) => {
		try {
			await testCases[errorType]()
		} catch (error) {
			Sentry.captureException(error, {
				tags: {
					test_type: errorType,
					environment: process.env.NODE_ENV
				}
			})
			throw error // Re-throw to trigger error boundary
		}
	}

	return (
		<div className="fixed bottom-4 right-4 space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
			<p className="text-sm font-medium text-gray-700">Test Error Handling</p>
			<div className="space-y-2">
				{Object.keys(testCases).map((testType) => (
					<button
						key={testType}
						onClick={() => handleTestError(testType as keyof typeof testCases)}
						className="block w-full rounded bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200">
						Test: {testType}
					</button>
				))}
			</div>
		</div>
	)
}

export default function ChatPage({
	params
}: {
	params: Promise<{chatId: string}>
}) {
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

	// Handle initial message loading
	useEffect(() => {
		const loadMessages = async () => {
			try {
				if (chatId !== 'new') {
					// Track message loading attempt
					Sentry.addBreadcrumb({
						category: 'messages',
						message: `Loading chat history: ${chatId}`,
						level: 'info'
					})

					const chatHistory = dummyMessages[chatId]
					if (!chatHistory) {
						throw new Error(`Chat ${chatId} not found`)
					}
					setMessages(chatHistory)
				} else {
					setMessages([])
				}
			} catch (error) {
				Sentry.captureException(error, {
					tags: {
						component: 'ChatPage',
						operation: 'loadMessages'
					},
					extra: {
						chatId,
						timestamp: new Date().toISOString()
					}
				})
			}
		}

		loadMessages()
	}, [chatId, setMessages])

	// Handle message submission with error tracking
	const handleSubmitWithTracking = async (e: React.FormEvent) => {
		try {
			// Track submission attempt
			Sentry.addBreadcrumb({
				category: 'chat',
				message: 'Submitting message',
				level: 'info',
				data: {inputLength: input.length}
			})

			await handleSubmit(e)
		} catch (error) {
			Sentry.captureException(error, {
				tags: {
					component: 'ChatPage',
					operation: 'submitMessage'
				},
				extra: {
					chatId,
					inputLength: input.length
				}
			})
			// You might want to show a user-friendly error message here
		}
	}

	return (
		<ChatErrorBoundary>
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
						handleSubmit={handleSubmitWithTracking}
					/>
					<p className="mt-2 text-center text-xs text-muted-foreground">
						Like that energy gel from 2019 in your pack, take this advice with a
						grain of salt.
					</p>
				</div>
			</footer>
			<TestSentryButton />
		</ChatErrorBoundary>
	)
}
