import React from 'react';
import classes from './CityCheckBox.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import * as flags from '../properties/imagesFile';

const CityCheckBox = (props) => {
    return (
        <div className={classes.Container}>
            <img className={classes.Flag} src={flags.flagImages[props.countryId]} alt={props.countryId}/>
            <Checkbox color="primary" checked={props.checked} onChange={props.onChange}/>
            <span className={classes.CityName}>{props.name}</span>
        </div>
    )
}

export default CityCheckBox;