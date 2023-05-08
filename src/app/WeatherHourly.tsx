// eslint-disable-line unicorn/filename-case
import Precipitation from './Precipitation'

function WeatherHourlyTime({ isActive = false, time = '' }) {
	return (
		<div className={`text-sm${isActive ? ' font-semibold' : ' text-zinc-500 dark:text-stone-300'}`}>
			{time}
		</div>
	)
}

function WeatherHourlyIcon({ isActive = false, src = '', alt = '' }) {
	return (
		<div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={src} alt={alt} className={isActive ? 'h-14 w-14' : 'h-10 w-10'} />
		</div>
	)
}

function WeatherHourlyTemperature({ isActive = false, temperature = 0 }) {
	return (
		<div
			className={`text-neutral-800 dark:text-zinc-100${
				isActive ? ' text-4xl font-semibold' : ' text-xl'
			}`}
		>
			{Math.round(temperature)}°
		</div>
	)
}

type Forecast = {
	precipitation: number
	temperature: number
	time: string
	weather: {
		description: string
		iconUrlLarge: string
	}
}

type WeatherHourlyProps = {
	forecast: Record<string, unknown>
	isActive: boolean
}

export default function WeatherHourly({ forecast, isActive }: WeatherHourlyProps) {
	const {
		precipitation,
		temperature,
		time,
		weather: { description, iconUrlLarge },
	} = forecast as Forecast

	return (
		<div className="flex flex-col items-center">
			<WeatherHourlyTime isActive={isActive} time={time} />
			<WeatherHourlyIcon isActive={isActive} src={iconUrlLarge} alt={description} />
			<WeatherHourlyTemperature isActive={isActive} temperature={temperature} />
			<Precipitation value={precipitation} />
		</div>
	)
}
