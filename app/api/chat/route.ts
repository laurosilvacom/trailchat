// Import necessary modules and functions
import * as Sentry from '@sentry/nextjs'
import {openai} from '@ai-sdk/openai'
import {streamText, tool} from 'ai'
import {z} from 'zod'
import {
	calculateTrimpScore,
	calculateRiegelPrediction,
	calculateTrailMetrics,
	calculateKarvonenZones
} from '@/lib/running-calculations'

// Define a constant for the maximum duration
export const maxDuration = 30

// Define validation schemas using Zod for input validation

// Schema for heart rate input
const HRInputSchema = z.object({
	maxHR: z.number().describe('Maximum heart rate in beats per minute'),
	restingHR: z.number().describe('Resting heart rate in beats per minute')
})

// Schema for race prediction input
const RacePredictionSchema = z.object({
	recentDistance: z.number().describe('Recent race distance in miles'),
	recentTime: z.number().describe('Recent race time in minutes')
})

// Schema for trail difficulty input
const TrailDifficultySchema = z.object({
	distance: z.number().describe('Distance in miles'),
	elevationGain: z.number().describe('Elevation gain in feet'),
	surfaceType: z.enum(['technical', 'moderate', 'easy'])
})

// Schema for training load input
const TrainingLoadSchema = z.object({
	duration: z.number().describe('Duration in minutes'),
	avgHR: z.number().describe('Average heart rate'),
	maxHR: z.number().describe('Maximum heart rate'),
	restingHR: z.number().describe('Resting heart rate')
})

// API Route Handler for POST requests
export async function POST(req: Request) {
	try {
		const {messages} = await req.json()

		if (!messages || !Array.isArray(messages)) {
			throw new Error('Invalid messages format')
		}

		const result = streamText({
			model: openai('gpt-4o-mini'),
			messages,
			tools: {
				calculateHRZones: tool({
					description:
						'Calculate heart rate training zones using Karvonen Formula',
					parameters: HRInputSchema,
					execute: async ({maxHR, restingHR}) => {
						try {
							return calculateKarvonenZones(maxHR, restingHR)
						} catch (error) {
							Sentry.captureException(error, {
								tags: {tool: 'calculateHRZones'},
								extra: {maxHR, restingHR}
							})
							throw error
						}
					}
				}),

				calculateRacePredictions: tool({
					description: 'Calculate race predictions using Riegel formula',
					parameters: RacePredictionSchema,
					execute: async ({recentDistance, recentTime}) => {
						try {
							return calculateRiegelPrediction(recentDistance, recentTime)
						} catch (error) {
							Sentry.captureException(error, {
								tags: {tool: 'calculateRacePredictions'},
								extra: {recentDistance, recentTime}
							})
							throw error
						}
					}
				}),

				calculateTrailDifficulty: tool({
					description:
						'Calculate trail difficulty using elevation and distance',
					parameters: TrailDifficultySchema,
					execute: async ({distance, elevationGain, surfaceType}) => {
						try {
							return calculateTrailMetrics(distance, elevationGain, surfaceType)
						} catch (error) {
							Sentry.captureException(error, {
								tags: {tool: 'calculateTrailDifficulty'},
								extra: {distance, elevationGain, surfaceType}
							})
							throw error
						}
					}
				}),

				calculateTrainingLoad: tool({
					description: 'Calculate training load using TRIMP score',
					parameters: TrainingLoadSchema,
					execute: async ({duration, avgHR, maxHR, restingHR}) => {
						try {
							return calculateTrimpScore(duration, avgHR, maxHR, restingHR)
						} catch (error) {
							Sentry.captureException(error, {
								tags: {tool: 'calculateTrainingLoad'},
								extra: {duration, avgHR, maxHR, restingHR}
							})
							throw error
						}
					}
				})
			}
		})

		return result.toDataStreamResponse()
	} catch (error) {
		Sentry.captureException(error, {
			tags: {
				endpoint: '/api/chat',
				operation: 'POST'
			}
		})
		throw error
	}
}
