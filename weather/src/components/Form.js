import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: "0.5rem",
      minWidth: 100,
      height: "50px",
      justifyContent: "center"
    }
  }));

const Form = (props) => {
    const classes = useStyles();
    const { city, state, submitForm, handleState, handleCity } = props;
    return (
        <StyledForm onSubmit={submitForm}>
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField 
                    value={city}
                    onChange={handleCity}
                    id="outlined-basic" 
                    label="City" 
                    variant="outlined" />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
                <Select
                native
                value={state}
                onChange={handleState}
                label="State"
                inputProps={{
                    name: 'state',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
                </Select>
            </FormControl> 
            <FormControl variant="outlined" className={classes.formControl}> 
                <Button 
                    type="submit"
                    variant="outlined" 
                    color="primary">
                    Search
                </Button>
            </FormControl>
        </StyledForm>
    )
}

export default Form

const StyledForm = styled.form`
    margin: 1rem auto;
    background-color: #f4f3ee;
`;