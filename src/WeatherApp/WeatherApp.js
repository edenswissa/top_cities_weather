import React , {Component} from 'react';
import classes from './WeatherApp.module.css';
import CityCheckBox from '../cityCheckBox/CityCheckBox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CityWeather from '../cityWeather/CityWeather';
import * as weatherService from '../services/WeatherService';
import Checkbox from '@material-ui/core/Checkbox';


class WeatherApp extends Component {

    state={
        checkedCities:[],
        citiesWeather:[],
        selectAll:false,
        loading:false
    }

    onCheckBoxChange = (cityName) => {
        let newCitiesArr = [...this.state.checkedCities];
        const index = newCitiesArr.indexOf(cityName);
        if(index > -1) {
            newCitiesArr.splice(index,1);
        } else {
            newCitiesArr.push(cityName);
        }
        this.setState({checkedCities: newCitiesArr});
    }

    onSubmit = () => {
        // this.setState({loading:true});
        weatherService.getCitiesWeather(this.state.checkedCities).then(res => {
            this.setState({citiesWeather:res, loading:false})
        });
    }

    onSelectAll = () => {
        if(this.state.selectAll) {
            this.setState({checkedCities:[],selectAll:false});
        } else {
            const checkedCities = weatherService.topCities.map(item => item.cityName);
            this.setState({checkedCities:checkedCities,selectAll:true});
        }
    }
    
    render() {
        return(
            <div className={classes.Conatiner}>
                <div className={classes.Header}>
                    Top Cities Weather
                </div>
                <div className={classes.CitiesOptionsContainer}>
                    {weatherService.topCities.map(city => {
                        return(
                            <CityCheckBox name={city.cityName} 
                                          countryId={city.countryId} 
                                          checked={this.state.checkedCities.indexOf(city.cityName) > -1} 
                                          onChange={() => this.onCheckBoxChange(city.cityName)}
                                          key={city.cityName}/>
                        );
                    })}
                    <div className={classes.SelectAllContainer}>
                        <Checkbox checked={this.state.selectAll} color={"primary"} onChange={this.onSelectAll}/>
                        <span className={classes.SelectAllText}>All</span>
                    </div>   
                </div>
                <div className={classes.ButtonContianer}>
                    <Button variant="contained" color="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </div>
                <Divider/>
                <div className={classes.CitiesContainer}>
                    {this.state.citiesWeather.map(city => {
                        return <CityWeather city={city} key={city.name}/>
                    })} 
                </div>
            </div>
        )
    }
} 

export default WeatherApp;