import React, { Component } from "react";
import { render } from "react-dom";
// import Hello from "./Hello";
import { Calculator } from "./Calculator";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <Clock name={this.state.name} />
        <p>Start editing to see some magic happen :)</p>
        <List />
      </div>
    );
  }
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <Welcome date={this.state.date} name={this.props.name} />
        <FormatedDate date={this.state.date} />
        <ActionLink link={"http://bitfactor.fi"} />
        <Toggle />
        <NameForm />
        <Calculator />
      </div>
    );
  }
}
function Welcome(props) {
  return (
    <div>
      <h1> Helloy, {props.name}</h1>
      <h2> It is date {props.date.toLocaleTimeString()}</h2>
    </div>
  );
}

function FormatedDate(props) {
  return (
    <div>
      <h3 style={{ color: "red", background: "yellow" }}>
        {" "}
        And now it is {props.date.toLocaleTimeString()}{" "}
      </h3>
    </div>
  );
}

function ActionLink(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log("Link was clicked", props.link);
  }

  return (
    <a href={props.link} onClick={handleClick}>
      {" "}
      click me !!
    </a>
  );
}

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    const toggle = this.state.isToggleOn;
    let status;
    if (toggle) {
      status = <ToggleOn />;
    } else {
      status = <ToggleOff />;
    }
    // This syntax ensures `this` is bound within handleClick
    // () => this.handleClick() use bind for performance
    /* <button onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button> */
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? "ON" : "OFF"}
        </button>
        <ShowToggleStatus isToggle={this.state.isToggleOn} />
        {status}
        {toggle ? <ToggleOn /> : <ToggleOff hide={true}/>}
      </div>
    );
  }
}
function ShowToggleStatus(props) {
  const isToggle = props.isToggle;
  if (isToggle) {
    return <ToggleOn />;
  }
  return <ToggleOff />;
}
function ToggleOn() {
  return (
    <div>
      <h4 style={{ color: "greenyellow" }}> OOOOONNNN </h4>
    </div>
  );
}

function ToggleOff(props) {
  if(props.hide) {
    return null;
  }
  return (
    <div>
      <h4 style={{ color: "red" }}> OOOOOFFF </h4>
    </div>
  );
}

function List() {
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  const listItems = numbers.map((number, indx) =>
    <li key={number.toString()}> {number%2} {number.toString()} </li>
  );

  return (<ul> {listItems} </ul>); 
}
//setInterval(() => console.log('***'), 1000);
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
 
  handleClear(event) {
    event.preventDefault();
    this.setState({value: ''});
  }

  handleSubmit(event) {
    console.log('### ', event.target.name);
    if(event.target.name === 'Clear') {
      event.preventDefault();
      this.setState({value: ''});
    }
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <input type="button" value="Clear" name="Clear" />
      </form>
    );
  }
}
render(<App />, document.getElementById("root"));
