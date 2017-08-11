import React from 'react'

class todaysWeather extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		const style = {
			width: '90%',
			maxWidth: 500
		}

		return(
			<div>
				<h3>Verwachting meerdaags: { this.props.today.titel }</h3>
				<p style={style}>{ this.props.today.samenvatting }</p>
			</div>
		)
	}
}

export default todaysWeather
