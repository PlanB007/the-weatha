// utilities
import React from 'react'
import ReactDOM from 'react-dom'
import { parseString } from 'xml2js'
import axios from 'axios'
import R from 'ramda'

// components
import TodaysWeather from './components/todaysWeather'
import MoreDays from './components/moredays'

const flattenObj = obj => {
  const go = obj_ => R.chain(([k, v]) => {
    if (typeof v == 'object') {
      return R.map(([k_, v_]) => [`${k}.${k_}`, v_], go(v))
    } else {
      return [[k, v]]
    }
  }, R.toPairs(obj_))

  return R.fromPairs(go(obj))
}

class App extends React.Component {

	constructor() {
    super()
		this.state = {
			weerdata: {},
			actueelweerIcon: '',
      date: '',
      moredays: [],
      today: {}
		}
	}

	componentDidMount () {
	  this.fetchBuienradarData()
	}

	fetchBuienradarData () {
		axios.get('http://xml.buienradar.nl')
	    .then(({ data: xml }) => {
	      parseString(xml, { trim: true, explicitArray: false, preserveChildrenOrder: true }, (error, parsed) => {
          const moredaysData = parsed.buienradarnl.weergegevens.verwachting_meerdaags
          const moredays = []

          for (let i = 0; i < 5; i++) {
            const oneday = moredaysData[`dag-plus${i + 1}`]
            moredays.push(oneday)
          }

          const result = flattenObj(parsed.buienradarnl.weergegevens)
          console.log(result)

					this.setState({
            moredays,
            weerdata: result,
            today: parsed.buienradarnl.weergegevens.verwachting_vandaag,
            actueelweerIcon: R.prop('actueel_weer.buienradar.icoonactueel._', result),
            date: new Date().toDateString()
          })
				})
	    })
	}

	render() {
		return (
      <div>
        <h1>{ this.state.date }</h1>
        <TodaysWeather today={ this.state.today }/>
        <MoreDays moredays={ this.state.moredays }/>
      </div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#root'))
