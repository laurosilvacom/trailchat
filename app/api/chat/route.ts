// Import necessary modules and functions
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
	// Extract messages from the request body
	const {messages} = await req.json()

	// Stream text using the OpenAI model and defined tools
	const result = streamText({
		model: openai('gpt-4o-mini'),
		messages,
		tools: {
			// Tool for calculating heart rate training zones using the Karvonen Formula
			calculateHRZones: tool({
				description:
					'Calculate heart rate training zones using Karvonen Formula',
				parameters: HRInputSchema,
				execute: async ({maxHR, restingHR}) => {
					return calculateKarvonenZones(maxHR, restingHR)
				}
			}),

			// Tool for calculating race predictions using the Riegel formula
			calculateRacePredictions: tool({
				description: 'Calculate race predictions using Riegel formula',
				parameters: RacePredictionSchema,
				execute: async ({recentDistance, recentTime}) => {
					return calculateRiegelPrediction(recentDistance, recentTime)
				}
			}),

			// Tool for calculating trail difficulty using elevation and distance
			calculateTrailDifficulty: tool({
				description: 'Calculate trail difficulty using elevation and distance',
				parameters: TrailDifficultySchema,
				execute: async ({distance, elevationGain, surfaceType}) => {
					return calculateTrailMetrics(distance, elevationGain, surfaceType)
				}
			}),

			// Tool for calculating training load using TRIMP score
			calculateTrainingLoad: tool({
				description: 'Calculate training load using TRIMP score',
				parameters: TrainingLoadSchema,
				execute: async ({duration, avgHR, maxHR, restingHR}) => {
					return calculateTrimpScore(duration, avgHR, maxHR, restingHR)
				}
			})
		}
	})

	// Return the result as a data stream response
	return result.toDataStreamResponse()
}
