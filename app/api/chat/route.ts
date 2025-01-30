import {openai} from '@ai-sdk/openai'
import {streamText, tool} from 'ai'
import {z} from 'zod'

export const maxDuration = 30

export async function POST(req: Request) {
	const {messages} = await req.json()

	const result = streamText({
		model: openai('gpt-4'),
		messages,
		tools: {
			calculateHRZones: tool({
				description:
					'Calculate heart rate training zones based on max heart rate',
				parameters: z.object({
					maxHR: z.number().describe('Maximum heart rate in beats per minute')
				}),
				execute: async ({maxHR}) => {
					return {
						zone1: {
							name: 'Zone 1 - Recovery',
							min: Math.round(maxHR * 0.5),
							max: Math.round(maxHR * 0.6),
							description: 'Very light intensity, warm up and recovery'
						},
						zone2: {
							name: 'Zone 2 - Endurance',
							min: Math.round(maxHR * 0.6),
							max: Math.round(maxHR * 0.7),
							description: 'Light intensity, improves basic endurance'
						},
						zone3: {
							name: 'Zone 3 - Aerobic',
							min: Math.round(maxHR * 0.7),
							max: Math.round(maxHR * 0.8),
							description: 'Moderate intensity, improves aerobic fitness'
						},
						zone4: {
							name: 'Zone 4 - Threshold',
							min: Math.round(maxHR * 0.8),
							max: Math.round(maxHR * 0.9),
							description: 'Hard intensity, increases lactate threshold'
						},
						zone5: {
							name: 'Zone 5 - VO2 Max',
							min: Math.round(maxHR * 0.9),
							max: maxHR,
							description: 'Maximum intensity, improves speed and power'
						}
					}
				}
			})
		}
	})

	return result.toDataStreamResponse()
}
