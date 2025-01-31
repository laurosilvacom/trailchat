export interface RunningCalculations {
	HRZones: {
		zone1: ZoneData
		zone2: ZoneData
		zone3: ZoneData
		zone4: ZoneData
		zone5: ZoneData
	}
	RacePrediction: {
		predictions: {
			fiveK: number
			tenK: number
			halfMarathon: number
			marathon: number
		}
		methodology: string
	}
	TrailMetrics: {
		difficultyScore: number
		verticalKmRatio: number
		paceImpact: {
			percentSlower: number
			minutesPerMile: number
		}
		energyExpenditure: string
		rating: string
	}
	TrainingLoad: {
		trimpScore: number
		intensity: {
			level: number
			description: string
		}
		recovery: {
			hoursNeeded: number
			recommendation: string
		}
		methodology: string
	}
}
