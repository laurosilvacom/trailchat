'use client'

import * as Sentry from '@sentry/nextjs'
import {Component, ErrorInfo, ReactNode} from 'react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
}

export class ChatErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError(): State {
		return {hasError: true}
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		Sentry.captureException(error, {
			tags: {
				component: 'ChatInterface'
			},
			contexts: {
				react: {
					componentStack: errorInfo.componentStack
				}
			}
		})
	}

	public render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="rounded-md border border-red-200 bg-red-50 p-4">
						<h3 className="font-medium text-red-800">Something went wrong</h3>
						<p className="mt-1 text-sm text-red-600">
							Weve been notified and are looking into it.
						</p>
						<button
							onClick={() => {
								this.setState({hasError: false})
								window.location.reload()
							}}
							className="mt-2 rounded-md bg-red-100 px-3 py-1 text-sm text-red-700 transition-colors hover:bg-red-200">
							Try again
						</button>
					</div>
				)
			)
		}

		return this.props.children
	}
}
