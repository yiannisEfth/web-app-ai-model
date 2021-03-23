import React from 'react';
import axios  from 'axios';
import logo from '../logo.svg';

export default class MLHandle extends React.Component {
    state = {
        number: 0,
        isLoading: false,
        result: ""
    }

    handleChange = event => {
        this.setState({ number: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const number = this.state.number;
        this.setState ({ isLoading: true });

        axios.post('http://localhost:5000/predict', { number })
            .then(res => {
                //console.log(res);
                console.log(res.data);
                this.setState ({ 
                    result: res.data,
                    isLoading: false
                 });
            })
            .catch( error => {
                this.setState ({ 
                    isLoading: false
                 });
                 console.log("Error thrown", error)
                });
    }

    render() {
        const isLoading = this.state.isLoading;
        const result = this.state.result;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Number to predict:
                        <input type="text" name="number" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Predict</button>
                </form>
                <label>
                   { isLoading ? <img src={logo} className="App-logo" alt="loading" /> : 'Waiting to predict' }
                </label>
                <p>
                    { result==="" ? "Result will show here" : "Result is: " + result }
                </p>
            </div>
        )
    }
}