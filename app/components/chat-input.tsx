import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {SendHorizontal} from 'lucide-react'
import {cn} from '@/lib/utils'

export function ChatInput({onSubmit}: {onSubmit: (value: string) => void}) {
	const [input, setInput] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (input.trim()) {
			onSubmit(input)
			setInput('')
		}
	}

	return (
		<div className="bottom-0 left-0 right-0 p-4">
			<form
				onSubmit={handleSubmit}
				className={cn(
					'mx-auto flex max-w-3xl items-center gap-3',
					'rounded-lg border bg-background/95 p-3',
					'shadow-lg ring-1 ring-border/5 backdrop-blur supports-[backdrop-filter]:bg-background/60'
				)}>
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Message TrailChat..."
					className={cn(
						'min-h-[50px] border-0 bg-transparent text-base',
						'placeholder:text-muted-foreground/60',
						'focus-visible:ring-0',
						'disabled:opacity-50'
					)}
				/>
				<Button
					type="submit"
					size="icon"
					disabled={!input.trim()}
					className={cn(
						'shrink-0 transition-all duration-200',
						input.trim()
							? 'bg-primary text-primary-foreground hover:bg-primary/90'
							: 'bg-muted text-muted-foreground',
						'rounded-lg px-4 py-2',
						'disabled:cursor-not-allowed disabled:opacity-50'
					)}>
					<SendHorizontal
						className={cn(
							'h-5 w-5',
							'transition-transform duration-200',
							input.trim() && 'translate-x-0.5'
						)}
					/>
				</Button>
			</form>
		</div>
	)
}
