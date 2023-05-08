'use client'

import { ReactNode, useMemo, useState } from 'react'
import type { ChangeEvent, ChangeEventHandler } from 'react'

import debounce from '@/common/utils/debounce'

import useWeatherForecast from './use-weather-forecast'

import SearchBar from './SearchBar'
import Temperature from './Temperature'
import WeatherHourlyList from './WeatherHourlyList'
import WeatherDailyList from './WeatherDailyList'

function WeatherContainer({ children }: { children: ReactNode }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="z-10 w-full max-w-xl items-center justify-between p-2 sm:p-5">{children}</div>
		</main>
	)
}

function WeatherLocation({ name = '', country = '' }) {
	return <div className="text-sm text-zinc-800 dark:text-zinc-100">{`${name}, ${country}`}</div>
}

function WeatherHumidity({ humidity = 0 }) {
	return (
		<div>
			Humidity:&nbsp;<b>{humidity}%</b>
		</div>
	)
}

type Wind = { direction: string; speed: number }

function WeatherWind({ wind: { direction, speed }, units }: { wind: Wind; units: string }) {
	return (
		<div className="ml-3">
			<span>Wind:&nbsp;</span>
			<b>
				{speed} {units === 'metric' ? 'MPS' : 'MPH'} {direction}
			</b>
		</div>
	)
}

function WeatherHumidityAndWind({
	humidity,
	units,
	wind,
}: {
	humidity: number
	units: string
	wind: Wind
}) {
	return (
		<div className="mt-1 flex items-center text-sm">
			<WeatherHumidity humidity={humidity} />
			<WeatherWind wind={wind} units={units} />
		</div>
	)
}

/* eslint max-lines-per-function: ["error", { "max": 42, "skipBlankLines": true, "skipComments": true }], max-statements: ["error", 13] */
export default function Home() {
	const [searchKeyword, setSearchKeyword] = useState('sg')
	const [temperatureUnits, setTemperatureUnits] = useState('metric')
	const [selectedDayIndex, setSelectedDayIndex] = useState(0) // eslint-disable-line unicorn/no-null
	const [weatherForecast, isLoadingWeatherForecast, isErrorLoadingWeatherForecast] =
		useWeatherForecast({ keyword: searchKeyword, temperatureUnits })

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearchKeyword(event.target.value || 'sg')
	const handleTemperatureClick = (units: string) => setTemperatureUnits(units)

	const debounceResults = useMemo(() => debounce(handleSearch, 1000, {}), [])

	if (isErrorLoadingWeatherForecast) return <div>Failed to load weather</div>

	const hasWeatherForecast =
		!isLoadingWeatherForecast && Object.keys(weatherForecast || {}).length > 0

	const { country, name: countryName, dailyForecasts } = hasWeatherForecast && weatherForecast
	const { day, humidity, weather, wind } = hasWeatherForecast && dailyForecasts[selectedDayIndex]
	const selectedDayHourlyForecasts =
		hasWeatherForecast &&
		weatherForecast.hourlyForecasts
			.filter((hourlyForecast: { day: string }) => hourlyForecast.day === day)
			// NOTE: https://openweathermap.org/forecast5
			.slice(0, 8)

	return (
		<WeatherContainer>
			<SearchBar onChange={debounceResults as unknown as ChangeEventHandler<HTMLInputElement>} />
			{hasWeatherForecast && (
				<>
					<div className="mt-3 flex justify-between">
						<div className="text-2xl font-semibold">{weather.name}</div>
						<Temperature activeUnits={temperatureUnits} onClick={handleTemperatureClick} />
					</div>
					<WeatherLocation name={countryName} country={country} />
					<WeatherHourlyList hourlyForecasts={selectedDayHourlyForecasts} />
					<WeatherHumidityAndWind humidity={humidity} units={temperatureUnits} wind={wind} />
					<WeatherDailyList
						dailyForecasts={dailyForecasts}
						selectedIndex={selectedDayIndex}
						onWeatherDailyClick={(index) => setSelectedDayIndex(index)}
					/>
				</>
			)}
		</WeatherContainer>
	)
}
