export interface HRZones {
	zone1: ZoneData
	zone2: ZoneData
	zone3: ZoneData
	zone4: ZoneData
	zone5: ZoneData
}

interface ZoneData {
	name: string
	min: number
	max: number
	description: string
}

export function calculateKarvonenZones(
	maxHR: number,
	restingHR: number
): HRZones {
	const hrReserve = maxHR - restingHR

	const calculateZoneHR = (percentage: number) =>
		Math.round(restingHR + hrReserve * percentage)

	return {
		zone1: {
			name: 'Zone 1 - Recovery',
			min: calculateZoneHR(0.5),
			max: calculateZoneHR(0.6),
			description: 'Active recovery, improves fat utilization'
		},
		zone2: {
			name: 'Zone 2 - Endurance',
			min: calculateZoneHR(0.6),
			max: calculateZoneHR(0.7),
			description: 'Aerobic endurance, foundation building'
		},
		zone3: {
			name: 'Zone 3 - Tempo',
			min: calculateZoneHR(0.7),
			max: calculateZoneHR(0.8),
			description: 'Lactate threshold improvement'
		},
		zone4: {
			name: 'Zone 4 - Threshold',
			min: calculateZoneHR(0.8),
			max: calculateZoneHR(0.9),
			description: 'VO2 max improvement'
		},
		zone5: {
			name: 'Zone 5 - Anaerobic',
			min: calculateZoneHR(0.9),
			max: maxHR,
			description: 'Speed and power development'
		}
	}
}

export function calculateRiegelPrediction(
	recentDistance: number,
	recentTime: number
) {
	const calculateTime = (targetDistance: number) => {
		return recentTime * Math.pow(targetDistance / recentDistance, 1.06)
	}

	return {
		predictions: {
			fiveK: Math.round(calculateTime(3.1) * 100) / 100,
			tenK: Math.round(calculateTime(6.2) * 100) / 100,
			halfMarathon: Math.round(calculateTime(13.1) * 100) / 100,
			marathon: Math.round(calculateTime(26.2) * 100) / 100
		},
		methodology: "Based on Riegel's endurance formula"
	}
}

export function calculateTrailMetrics(
	distance: number,
	elevationGain: number,
	surfaceType: 'technical' | 'moderate' | 'easy'
) {
	const surfaceMultiplier = {
		technical: 1.2,
		moderate: 1.1,
		easy: 1.0
	}

	const verticalKmRatio = (elevationGain / (distance * 5280)) * 1000
	const gradePercent = (elevationGain / (distance * 5280)) * 100
	const baseEnergyCost =
		0.2 * Math.pow(gradePercent, 2) + 0.9 * gradePercent + 3.5
	const difficulty = baseEnergyCost * surfaceMultiplier[surfaceType]

	return {
		difficultyScore: Math.round(difficulty * 10) / 10,
		verticalKmRatio: Math.round(verticalKmRatio * 10) / 10,
		paceImpact: {
			percentSlower: Math.round(gradePercent * 15) / 10,
			minutesPerMile: Math.round(gradePercent * 0.4 * 10) / 10
		},
		energyExpenditure: `${Math.round(baseEnergyCost * 10) / 10} METs`,
		rating:
			difficulty < 20
				? 'Easy'
				: difficulty < 40
					? 'Moderate'
					: difficulty < 60
						? 'Hard'
						: 'Very Hard'
	}
}

export function calculateTrimpScore(
	duration: number,
	avgHR: number,
	maxHR: number,
	restingHR: number
) {
	const hrRatio = (avgHR - restingHR) / (maxHR - restingHR)
	const y = hrRatio * 0.64 * Math.exp(1.92 * hrRatio)
	const trimp = duration * y

	return {
		trimpScore: Math.round(trimp),
		intensity: {
			level: Math.round(hrRatio * 100),
			description:
				hrRatio < 0.6
					? 'Recovery'
					: hrRatio < 0.7
						? 'Endurance'
						: hrRatio < 0.8
							? 'Tempo'
							: hrRatio < 0.9
								? 'Threshold'
								: 'High Intensity'
		},
		recovery: {
			hoursNeeded: Math.round(trimp / 10),
			recommendation:
				trimp > 100
					? 'High Recovery Needed'
					: trimp > 50
						? 'Moderate Recovery'
						: 'Light Recovery'
		},
		methodology: "Based on Banister's TRIMP score"
	}
}
