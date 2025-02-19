'use client'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {CableCar, TreePine, ArrowRight, Mountain} from 'lucide-react'
import {motion} from 'framer-motion'

export default function HomePage() {
	return (
		<div className="min-h-screen bg-primary text-primary-foreground">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary-foreground/5 to-transparent" />

			{/* Header */}
			<header className="relative border-b border-primary-foreground/10 backdrop-blur-sm">
				<nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
					<div className="flex items-center gap-2">
						<CableCar className="h-7 w-7" />
						<span className="text-2xl font-bold tracking-tight">TrailChat</span>
					</div>
					<div className="flex items-center gap-6">
						<Link href="/login">
							<Button variant="ghost">Log in</Button>
						</Link>
						<Link href="/signup">
							<Button variant="ghost">Sign up</Button>
						</Link>
					</div>
				</nav>
			</header>

			{/* Hero Section */}
			<main className="relative">
				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
					{/* Hero Content */}
					<div className="text-center">
						<motion.h1
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
							className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
							Your AI Trail Running
							<span className="block bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
								Assistant
							</span>
						</motion.h1>
						<motion.p
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
							transition={{delay: 0.2}}
							className="mx-auto mb-10 max-w-2xl text-xl text-primary-foreground/80 sm:text-2xl">
							Get personalized training plans, pace calculations, and expert
							advice for your trail running journey.
						</motion.p>
						<motion.div
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
							transition={{delay: 0.4}}>
							<Link href="/chat">
								<Button size="lg" variant={'secondary'}>
									Try TrailChat <ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</Link>
						</motion.div>
					</div>

					{/* Feature Grid */}
					<motion.div
						initial={{opacity: 0, y: 40}}
						animate={{opacity: 1, y: 0}}
						transition={{delay: 0.6}}
						className="mt-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<FeatureCard
							icon={<Mountain className="h-8 w-8 text-secondary" />}
							title="Heart Rate Zones"
							description="Get personalized training zones based on your max heart rate and fitness level"
						/>
						<FeatureCard
							icon={<TreePine className="h-8 w-8 text-secondary" />}
							title="Trail Difficulty"
							description="Calculate trail difficulty using elevation data and terrain analysis"
						/>
						<FeatureCard
							icon={<CableCar className="h-8 w-8 text-secondary" />}
							title="Race Predictions"
							description="AI-powered race time predictions across various distances and terrains"
						/>
					</motion.div>
				</div>
			</main>

			{/* Footer */}
			<footer className="relative border-t border-primary-foreground/10 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-6 py-8">
					<p className="text-center text-sm text-primary-foreground/60">
						TrailChat may produce inaccurate information. Always verify and
						train responsibly.
					</p>
				</div>
			</footer>
		</div>
	)
}

function FeatureCard({
	icon,
	title,
	description
}: {
	icon: React.ReactNode
	title: string
	description: string
}) {
	return (
		<div className="group relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 transition-all hover:bg-primary-foreground/10">
			<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl transition-all group-hover:bg-secondary/20" />
			<div className="relative">
				{icon}
				<h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
				<p className="mt-2 text-primary-foreground/80">{description}</p>
			</div>
		</div>
	)
}
