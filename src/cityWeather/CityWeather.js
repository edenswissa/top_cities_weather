import React, {Component} from 'react';
import classes from './CityWeather.module.css';
import Paper from '@material-ui/core/Paper';
import * as images from '../properties/imagesFile';

class CityWeather extends Component {

    state = {
        type:'celsius'
    }

    onTypeChange = (type) => {
        this.setState({type:type})
    }

    getBackgroundFromTemp = (temp) => {
        if(temp < 10) {
            return images.backgrounds.cold;
        }
        if (temp >= 10 && temp <= 25) {
            return images.backgrounds.nice;
        }
        if (temp > 20) {
            return images.backgrounds.hot;
        }
      }

    render() {
        let activeButton = [classes.Button,classes.ActiveButton].join(' ');
        return(
            <Paper className={classes.Paper} style={{backgroundImage: `url(${this.getBackgroundFromTemp(this.props.city.temperature.celsius)})`}}>
                <div className={classes.Container}>
                    <div className={classes.Header}>
                        <span className={classes.HeaderText}>
                            {this.props.city.name}
                        </span> 
                    </div>
                    <div className={classes.Icon}>
                        <img src={require('../assets/icons/'+this.props.city.weatherIcon+'.png')} alt={this.props.city.name + "Icon"}/>
                    </div>
                    <div className={classes.TepmContainer}>
                        <div className={classes.Temp}>{this.props.city.temperature[this.state.type]}°</div>
                        <div className={classes.Unit}>{this.state.type === 'celsius' ? 'C' : 'F'}</div>
                    </div>
                    <div className={classes.UnitButtons}>
                        <div className={this.state.type === 'celsius' ? activeButton: classes.Button}
                             onClick={() => this.onTypeChange('celsius')}>C</div>
                        <div className={this.state.type === 'fahrenheit' ? activeButton : classes.Button}
                             onClick={() => this.onTypeChange('fahrenheit')}>F</div>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default CityWeather;