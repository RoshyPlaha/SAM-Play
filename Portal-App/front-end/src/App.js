import React, { Component } from 'react';
import logo from './RoshyBank.png'
import './App.css';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '', mobileNumber: '', postcode: 'DA', selectedOption: 'A' };

    this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleIdChange(event) {
    this.setState({ id: event.target.value });
  }

  handleMobileNumberChange(event) {
    this.setState({ mobileNumber: event.target.value });
  }

  handlePostcodeChange(event) {
    this.setState({ postcode: event.target.value });
  }

  handleOptionChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  handleSubmit(event) {
    alert('A id was submitted: ' + this.state.id + ' and number:' + this.state.mobileNumber + 'and option chosen: ' + this.state.selectedOption);
    event.preventDefault();

    fetch('https://a2ezxgmole.execute-api.eu-west-2.amazonaws.com/Prod/submitOption', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.id,
        postCode: this.state.postcode,
        accountNumber: '209292',
        mobileNumber: this.state.mobileNumber,
        option: this.state.selectedOption
      })
    })
  }

  render() {
    return (
      <div className="form-style-6">
        <h1>My details</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Identification Number:
          <input type="text" value={this.state.id} onChange={this.handleIdChange} />
          </label><br />
          <label>
            Mobile Number:
          <input type="text" value={this.state.value} onChange={this.handleMobileNumberChange} />
          </label><br />
          <h1>Choose your plan</h1>
          <input type="radio" name="demo" value="A" id="radio-one" className="form-radio" checked={this.state.selectedOption === "A"} onChange={this.handleOptionChange} /><label htmlFor="radio-one">Option A</label>
          <input type="radio" name="demo" value="B" id="radio-two" className="form-radio" checked={this.state.selectedOption === "B"} onChange={this.handleOptionChange} /><label htmlFor="radio-two">Option B</label>
          <input type="radio" name="demo" value="C" id="radio-three" className="form-radio" checked={this.state.selectedOption === "C"} onChange={this.handleOptionChange} /><label htmlFor="radio-three">Option C</label>
          <input type="submit" value="Submit" />
        </form>
      </div>

    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Roshy's Bank</h1>
        </header>
        <div>
          <CustomerForm />
        </div>
      </div>
    );
  }
}

export default App;
