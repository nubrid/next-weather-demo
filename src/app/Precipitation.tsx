// eslint-disable-line unicorn/filename-case
function PrecipitationIcon() {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8.33853 4.317L5.48678 0L2.64997 4.3072C2.14775 5.03131 1.92431 5.92068 2.02272 6.8039C2.12114 7.68713 2.53443 8.50169 3.18295 9.09058C4.50942 10.2992 6.50617 10.3036 7.82757 9.10081C8.47398 8.51033 8.88422 7.69469 8.97896 6.81162C9.07371 5.92854 8.84623 5.04075 8.34051 4.31992L8.33853 4.317Z"
				fill="#3969EF"
			/>
		</svg>
	)
}

export default function Precipitation({ value = 0 }) {
	return value ? (
		<div className="flex items-center">
			<div>
				<PrecipitationIcon />
			</div>
			<div className="ml-1 text-sm text-blue-600">{Math.round(value)}%</div>
		</div>
	) : null // eslint-disable-line unicorn/no-null
}
