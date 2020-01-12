import weatherAxios from '../axioses/axios-weather';
import * as properties from '../properties/properties';

export const topCities = [{
    cityName:'Jerusalem',
    countryId:'IL',
},{
    cityName:'Berlin',
    countryId:'DE',
},{
    cityName:'New York',
    countryId:'US',
},{
    cityName:'Beijing',
    countryId:'CN',
},{
    cityName:'Madrid',
    countryId:'ES',
},{
    cityName:'Moscow',
    countryId:'RU',
},{
    cityName:'Cairo',
    countryId:'EG',
},{
    cityName:'London',
    countryId:'GB',
},{
    cityName:'Buenos Aires',
    countryId:'AR',
},{
    cityName:'Paris',
    countryId:'FR',
}];

export const getCitiesWeather = (cityNamesArr) => {
    return weatherAxios.get('/' + properties.topCitiesUrl ,{params: {apikey:properties.weather_apikey}}).then(res => {
        let citiesWeather = [];
        const data = res.data;
        cityNamesArr.forEach(element => {
            const obj = data.find(item => item.LocalizedName === element);
            const city = {
                name:element,
                weatherText: obj.WeatherText,
                weatherIcon: obj.WeatherIcon,
                temperature: {
                    celsius:obj.Temperature.Metric.Value,
                    fahrenheit:obj.Temperature.Imperial.Value
                }
            }
            citiesWeather.push(city);
        });
        return citiesWeather;
    })
}