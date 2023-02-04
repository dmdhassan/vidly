import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }

    validate = () => {
        let options = { abortEarly: false };
        let errors = {};
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if(!error) return null;

        for(let item of error.details) {
            errors[item.path[0]] = item.message;
        }


        return errors;
    }

    validateProperty = ({ name, value }) => {
        let obj = {[name]: value};
        let schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);

        return error ? error.details[0].message : null
        
    }

    handleChange = ({ currentTarget: input }) => {

        let errors = {...this.state.errors};
        let errorMessage = this.validateProperty(input);
        if(errorMessage) {
            errors[input.name] = errorMessage;

        } else {

            delete errors[input.name];
        }

        let data = { ...this.state.data }
        data[input.name] = input.value;
        this.setState({data, errors})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const errors = this.validate()
        this.setState({ errors: errors || {} })

        if(errors) return;
        this.doSubmit();
        
    }
    
    renderInput(name, label, type, ...rest) {
        const { data, errors } = this.state;

        return (
            <Input
                label={label} 
                name={name} 
                value={data[name]} 
                onChange={this.handleChange} 
                type={type} 
                error={errors[name]}
            />
        )
    }

    renderSelect(name, label, options, ...rest) {
        // const value = this.state.genres.find(g => g._id === this.state.data.genreId)
        // console.log(value) -- comeback to automatically set the value for genre

        return (
            <Select 
                name={name}
                label={label}
                options={options}
                onChange={this.handleChange}
            />
        )
    }

    renderButton(label) {
        return (
            <button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>
        )
    }
    
}
 
export default Form;