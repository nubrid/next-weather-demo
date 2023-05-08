// NOTE: https://iancarpenter.dev/2020/04/19/openweathermap-two-useful-conversions-for-wind-data/
const COMPASS_POINTS = [
	'N',
	'NNE',
	'NE',
	'ENE',
	'E',
	'ESE',
	'SE',
	'SSE',
	'S',
	'SSW',
	'SW',
	'WSW',
	'W',
	'WNW',
	'NW',
	'NNW',
]

export default function convertDegreeToCompassPoint(degree: number) {
	const rawPosition = Math.floor(degree / 22.5 + 0.5)
	const arrayPosition = rawPosition % 16

	return COMPASS_POINTS[arrayPosition]
}
