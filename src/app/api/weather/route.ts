import { NextResponse } from 'next/server'

import convertDegreeToCompassPoint from '@/common/utils/convert-degree-to-compass-point'

type WeatherDataList = {
	dt: number
	pop: number
	main: {
		feels_like: number
		humidity: number
		temp: number
	}
	weather: {
		description: string
		icon: string
		id: number
		main: string
	}[]
	wind: {
		deg: number
		gust: number
		speed: number
	}
}

type WeatherData = {
	city: {
		country: string
		name: string
	}
	list: WeatherDataList[]
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/* eslint max-lines-per-function: ["error", { "max": 24, "skipBlankLines": true, "skipComments": true }] */
function getHourlyForecasts(weatherDataList: WeatherDataList[]) {
	return weatherDataList.map((hourlyForecast) => {
		const currentTime = new Date(hourlyForecast.dt * 1000)
		const militaryTime = currentTime.getHours()

		return {
			// e.g. 1 PM
			time: `${(militaryTime + 24) % 12 || 12} ${militaryTime >= 12 ? 'PM' : 'AM'}`,
			day: DAY_NAMES[currentTime.getDay()],
			weather: {
				name: hourlyForecast.weather[0].main,
				description: hourlyForecast.weather[0].description,
				iconUrl: `${process.env.WEATHER_ICON_URL}${hourlyForecast.weather[0].icon}.png`,
				iconUrlLarge: `${process.env.WEATHER_ICON_URL}${hourlyForecast.weather[0].icon}@2x.png`,
			},
			feelsLike: hourlyForecast.main.feels_like,
			temperature: hourlyForecast.main.temp,
			precipitation: hourlyForecast.pop * 100,
			humidity: hourlyForecast.main.humidity,
			wind: {
				speed: hourlyForecast.wind.speed,
				direction: convertDegreeToCompassPoint(hourlyForecast.wind.deg),
			},
		}
	})
}

function getDailyFromHourlyForecasts(hourlyForecasts: []) {
	// eslint-disable-next-line unicorn/no-array-reduce
	const dailyForecasts = hourlyForecasts.reduce(
		(forecasts, currentForecast: { day: string }) =>
			forecasts.some(({ day }) => day === currentForecast.day)
				? forecasts
				: [...forecasts, currentForecast],
		[] as { day: string }[],
	)

	// NOTE: https://openweathermap.org/forecast5
	return dailyForecasts.slice(0, 5)
}

/* eslint import/prefer-default-export: "off", max-statements: ["error", 12] */
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const geocodeQuery = searchParams.get('q')?.replace(' ', '+')
	const temperatureUnits = searchParams.get('units') || 'metric'

	const geocodeResponse = await fetch(`${process.env.GEOCODING_API_ENDPOINT_URL}?q=${geocodeQuery}`)

	const geocode = await geocodeResponse.json()

	const { lat = '', lon = '' } = geocode?.length > 0 && geocode[0]
	const isGeocodeFoundForQuery = lat !== '' && lon !== ''

	if (!isGeocodeFoundForQuery) return NextResponse.json({})

	const weatherResponse = await fetch(
		`${process.env.WEATHER_API_ENDPOINT_URL}?lat=${lat}&lon=${lon}&units=${temperatureUnits}&appid=${process.env.WEATHER_API_KEY}`,
	)
	// The return value is *not* serialized
	// You can use Date, Map, Set, etc.
	const weatherData = (await weatherResponse.json()) as WeatherData
	const hourlyForecasts = getHourlyForecasts(weatherData?.list)

	return NextResponse.json({
		country: weatherData?.city.country,
		name: weatherData?.city.name,
		hourlyForecasts,
		dailyForecasts: getDailyFromHourlyForecasts(hourlyForecasts as []),
	})
}
