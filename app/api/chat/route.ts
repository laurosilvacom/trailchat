import {openai} from '@ai-sdk/openai'
import {streamText, tool} from 'ai'
import {z} from 'zod'
import {
	calculateTrimpScore,
	calculateRiegelPrediction,
	calculateTrailMetrics,
	calculateKarvonenZones
} from '@/lib/running-calculations'

export const maxDuration = 30

// Validation schemas
const HRInputSchema = z.object({
	maxHR: z.number().describe('Maximum heart rate in beats per minute'),
	restingHR: z.number().describe('Resting heart rate in beats per minute')
})

const RacePredictionSchema = z.object({
	recentDistance: z.number().describe('Recent race distance in miles'),
	recentTime: z.number().describe('Recent race time in minutes')
})

const TrailDifficultySchema = z.object({
	distance: z.number().describe('Distance in miles'),
	elevationGain: z.number().describe('Elevation gain in feet'),
	surfaceType: z.enum(['technical', 'moderate', 'easy'])
})

const TrainingLoadSchema = z.object({
	duration: z.number().describe('Duration in minutes'),
	avgHR: z.number().describe('Average heart rate'),
	maxHR: z.number().describe('Maximum heart rate'),
	restingHR: z.number().describe('Resting heart rate')
})

export async function POST(req: Request) {
	const {messages} = await req.json()

	const result = streamText({
		model: openai('gpt-4'),
		messages,
		tools: {
			calculateHRZones: tool({
				description:
					'Calculate heart rate training zones using Karvonen Formula',
				parameters: HRInputSchema,
				execute: async ({maxHR, restingHR}) => {
					return calculateKarvonenZones(maxHR, restingHR)
				}
			}),

			calculateRacePredictions: tool({
				description: 'Calculate race predictions using Riegel formula',
				parameters: RacePredictionSchema,
				execute: async ({recentDistance, recentTime}) => {
					return calculateRiegelPrediction(recentDistance, recentTime)
				}
			}),

			calculateTrailDifficulty: tool({
				description: 'Calculate trail difficulty using elevation and distance',
				parameters: TrailDifficultySchema,
				execute: async ({distance, elevationGain, surfaceType}) => {
					return calculateTrailMetrics(distance, elevationGain, surfaceType)
				}
			}),

			calculateTrainingLoad: tool({
				description: 'Calculate training load using TRIMP score',
				parameters: TrainingLoadSchema,
				execute: async ({duration, avgHR, maxHR, restingHR}) => {
					return calculateTrimpScore(duration, avgHR, maxHR, restingHR)
				}
			})
		}
	})

	return result.toDataStreamResponse()
}
