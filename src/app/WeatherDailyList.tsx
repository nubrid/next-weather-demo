// eslint-disable-line unicorn/filename-case
import WeatherDaily from './WeatherDaily'

type WeatherDailyListProps = {
	dailyForecasts: []
	onWeatherDailyClick: (index: number) => void
	selectedIndex: number
}

export default function WeatherDailyList({
	dailyForecasts,
	onWeatherDailyClick,
	selectedIndex,
}: WeatherDailyListProps) {
	return (
		<div className="mt-2 grid grid-cols-5">
			{dailyForecasts.map((dailyForecast: Record<string, unknown>, index: number) => (
				<WeatherDaily
					key={index}
					isActive={index === selectedIndex}
					forecast={dailyForecast}
					onClick={() => onWeatherDailyClick(index)}
				/>
			))}
		</div>
	)
}
