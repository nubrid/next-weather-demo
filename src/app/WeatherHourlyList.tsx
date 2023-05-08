// eslint-disable-line unicorn/filename-case
import WeatherHourly from './WeatherHourly'

export default function WeatherHourlyList({ hourlyForecasts = [] }) {
	return (
		<div className="mt-3 grid grid-cols-4 sm:grid-cols-8">
			{hourlyForecasts.map((hourlyForecast: Record<string, unknown>, index: number) => (
				<WeatherHourly key={index} isActive={index === 0} forecast={hourlyForecast} />
			))}
		</div>
	)
}
