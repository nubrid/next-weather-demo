import useSwr from '@/common/use-swr'

// NOTE: https://nextjs.org/docs/basic-features/data-fetching/client-side
export default function useWeatherForecast({
	keyword,
	temperatureUnits,
}: {
	keyword: string
	temperatureUnits: string
}) {
	const { data, error, isLoading } = useSwr(
		`/api/weather?q=${encodeURIComponent(keyword)}&units=${temperatureUnits}`,
	)

	return [data, isLoading, error]
}
