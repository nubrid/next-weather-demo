// eslint-disable-line unicorn/filename-case
import { ReactNode } from 'react'

function WeatherDailyContainer({
	children,
	isActive,
	onClick,
}: {
	children: ReactNode
	isActive: boolean
	onClick: () => void
}) {
	return (
		<div
			onClick={onClick}
			className={`flex cursor-pointer flex-col items-center rounded-lg border border-neutral-200 bg-neutral-100 py-2 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${
				isActive ? ' bg-white dark:bg-zinc-700' : ''
			}`}
		>
			{children}
		</div>
	)
}

function WeatherDailyIcon({ src = '', alt = '' }) {
	return (
		<div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={src} alt={alt} className="h-10 w-10" />
		</div>
	)
}

type Forecast = {
	day: string
	feelsLike: number
	temperature: number
	weather: {
		description: string
		iconUrlLarge: string
	}
}

type WeatherDailyProps = {
	forecast: Record<string, unknown>
	isActive: boolean
	onClick: () => void
}

export default function WeatherDaily({ forecast, isActive, onClick }: WeatherDailyProps) {
	const {
		day,
		feelsLike,
		temperature,
		weather: { description, iconUrlLarge },
	} = forecast as Forecast

	return (
		<WeatherDailyContainer isActive={isActive} onClick={onClick}>
			<div className="text-sm font-semibold">{day}</div>
			<WeatherDailyIcon src={iconUrlLarge} alt={description} />
			<div className="font-semibold">{Math.round(feelsLike)}°</div>
			<div className="text-sm text-stone-500">{Math.round(temperature)}°</div>
		</WeatherDailyContainer>
	)
}
