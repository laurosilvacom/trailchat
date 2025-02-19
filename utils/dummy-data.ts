import {type Message} from 'ai'

type ChatMessages = {
	[key: string]: Message[]
}

export const dummyMessages: ChatMessages = {
	chat1: [
		{
			id: '1',
			role: 'user',
			content: 'What are my heart rate zones if my max HR is 185?'
		},
		{
			id: '2',
			role: 'assistant',
			content: `Based on your maximum heart rate of 185 bpm, here are your training zones:

**Zone 1 (Recovery)**: 93-111 bpm
- Very light intensity
- Perfect for warm-ups and recovery runs

**Zone 2 (Endurance)**: 111-130 bpm
- Light intensity
- Great for long runs and building base fitness

**Zone 3 (Tempo)**: 130-148 bpm
- Moderate intensity
- Ideal for tempo runs and lactate threshold training

**Zone 4 (Threshold)**: 148-167 bpm
- Hard intensity
- For interval training and race pace work

**Zone 5 (Maximum)**: 167-185 bpm
- Maximum intensity
- For short intervals and sprints

*Remember to spend most of your training time in Zones 1 and 2 to build endurance while avoiding overtraining.*`
		}
	],

	chat2: [
		{
			id: '3',
			role: 'user',
			content:
				'Calculate the difficulty of a trail run that is 6 miles with 1500ft elevation gain on technical terrain.'
		},
		{
			id: '4',
			role: 'assistant',
			content: `I've analyzed your trail run metrics:

### Trail Difficulty Analysis:
- Distance: 6 miles
- Elevation Gain: 1500 ft
- Terrain: Technical

**Results:**
• Difficulty Score: 42.5 (Hard)
• Grade: 4.7%
• Pace Impact: Expect to run about 2-3 min/mile slower than your flat ground pace
• Energy Cost: 8.2 METs (Metabolic Equivalent)

**Recommendations:**
1. Take the uphills conservatively
2. Use shorter strides on technical sections
3. Consider using trail-specific shoes
4. Bring adequate water for ~1-1.5 hours of effort

*This is a challenging route that requires good technical skills and endurance. Make sure you're properly prepared for the terrain and elevation gain.*`
		}
	],

	chat3: [
		{
			id: '5',
			role: 'user',
			content:
				'Predict my marathon time based on my recent 10K time of 50 minutes.'
		},
		{
			id: '6',
			role: 'assistant',
			content: `Based on your 10K time of 50 minutes, here are your race predictions using Riegel's formula:

### 🏃‍♂️ Race Predictions:
• **5K**: 24:12
• **10K**: 50:00 (your current time)
• **Half Marathon**: 1:50:33
• **Marathon**: 3:51:45

**Keep in mind:**
1. These predictions assume:
   - Similar racing conditions
   - Proper marathon training
   - Good pacing strategy

2. For best marathon performance:
   - Build adequate weekly mileage
   - Include long runs
   - Practice nutrition strategy
   - Train specifically for the distance

*Your 10K time shows good potential for longer distances. Focus on endurance training to achieve these times!*`
		}
	],

	chat4: [
		{
			id: '7',
			role: 'user',
			content:
				'Calculate my training load for a 45-minute run where my average HR was 155, max HR is 185, and resting HR is 60.'
		},
		{
			id: '8',
			role: 'assistant',
			content: `I've calculated your training load using the TRIMP score method:

### Training Load Analysis:
• **TRIMP Score**: 89
• **Intensity Level**: 76% of Heart Rate Reserve
• **Training Zone**: Threshold Training

**Recovery Recommendations:**
• Recommended Recovery: 9 hours
• Intensity Category: Moderate-High
• Status: Moderate Recovery Needed

**This workout represents:**
- A significant aerobic stimulus
- Good threshold training
- Moderate physiological stress

**Recovery Suggestions:**
1. Ensure 7-8 hours of sleep
2. Consider an easy recovery run tomorrow
3. Stay hydrated
4. Monitor fatigue levels

*This was a quality workout that contributed well to your overall fitness. Make sure to balance it with proper recovery!*`
		}
	],

	chat5: [
		{
			id: '9',
			role: 'user',
			content:
				'What should my base training heart rate zones be for trail running? My max HR is 180.'
		},
		{
			id: '10',
			role: 'assistant',
			content: `For trail running base training, here are your heart rate zones based on a max HR of 180:

**Zone 1 (90-108 bpm):**
- Perfect for recovery and easy runs
- Use on technical descents when form is priority

**Zone 2 (108-126 bpm):**
- Your primary trail running zone
- Build aerobic base and endurance
- Most long runs should be here

**Zone 3 (126-144 bpm):**
- Moderate climbs
- Rolling terrain
- Technical sections

**Zone 4 (144-162 bpm):**
- Steep climbs
- Race pace efforts
- Hard intervals

**Zone 5 (162-180 bpm):**
- Short, intense climbs
- Sprint finishes
- Very brief efforts

**Trail Running Tips:**
1. Don't worry about pace, focus on effort
2. Stay in Zone 2 for most training
3. Let terrain dictate intensity
4. Build time on feet before adding intensity`
		}
	]
}
