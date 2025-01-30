import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {SendHorizontal} from 'lucide-react'
import {cn} from '@/lib/utils'

export function ChatInput({
	input,
	handleInputChange,
	handleSubmit
}: {
	input: string
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (e: React.FormEvent) => void
}) {
	return (
		<form onSubmit={handleSubmit}>
			<div
				className={cn(
					'flex items-center gap-3',
					'rounded-lg border bg-background/95 p-3',
					'shadow-lg ring-1 ring-border/5'
				)}>
				<Input
					value={input}
					onChange={handleInputChange}
					placeholder="Message TrailChat..."
					className={cn(
						'min-h-[50px] border-0 bg-transparent text-base',
						'placeholder:text-muted-foreground/60',
						'focus-visible:ring-0'
					)}
				/>
				<Button
					type="submit"
					size="icon"
					disabled={!input.trim()}
					className={cn(
						'shrink-0',
						input.trim()
							? 'bg-primary text-primary-foreground hover:bg-primary/90'
							: 'bg-muted text-muted-foreground'
					)}>
					<SendHorizontal className="h-5 w-5" />
				</Button>
			</div>
		</form>
	)
}
