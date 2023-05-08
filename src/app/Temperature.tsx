// eslint-disable-line unicorn/filename-case
type TemperatureUnitProps = {
	units: string
	isActive: boolean
	onClick: () => void
}

function TemperatureUnits({ units, isActive, onClick }: TemperatureUnitProps) {
	return (
		<span
			onClick={onClick}
			className={`ml-1 cursor-pointer text-sm font-semibold${
				isActive ? ' border-b-2 border-neutral-800 dark:border-gray-200' : ' text-zinc-500'
			}`}
		>
			{units}
		</span>
	)
}

type TemperatureProps = {
	activeUnits: string
	onClick: (units: 'metric' | 'imperial') => void
}

export default function Temperature({ activeUnits, onClick }: TemperatureProps) {
	return (
		<div>
			<TemperatureUnits
				units="°C"
				isActive={activeUnits === 'metric'}
				onClick={() => onClick('metric')}
			/>
			<TemperatureUnits
				units="°F"
				isActive={activeUnits === 'imperial'}
				onClick={() => onClick('imperial')}
			/>
		</div>
	)
}
