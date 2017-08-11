// utilities
import React from 'react'

class MoreDays extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div id='weather'>
          <div className='grid five'>
            {this.props.moredays.map(oneday => 
              <div key={oneday.dagweek} className='column'>
                <div className='content'>
                  <div className='header'>{ oneday.dagweek } <img className='icon right' src={ oneday.icoon._ }/></div>
                  <div className='main'>
                    <ul>
                      <li>Kansregen: <span>{ oneday.kansregen }%</span></li>
                      <li>kanszon: <span>{ oneday.kanszon}%</span></li>
                      <li>maxtemp: <span>&deg;{ oneday.mintemp }</span></li>
                      <li>mintemp: <span>&deg;{ oneday.mintemp }</span></li>
                      <li>windkracht: <span>{ oneday.windkracht }/12</span></li>
                    </ul>
                  </div>
                  <div className='footer'></div>
                </div>
              </div>
            )}
           </div>
        </div>
       </div>
    )
  }
}

export default MoreDays