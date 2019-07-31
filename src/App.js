import React from 'react';
import './App.css';

const notes = [{
  keyTrigger: 'Q',
  id: 'Tromme-1',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/BD0010.mp3'
}, {
  keyTrigger: 'W',
  id: 'Tromme-2',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0010.mp3'
}, {
  keyTrigger: 'E',
  id: 'Tromme-3',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0000.mp3'
}, {
  keyTrigger: 'A',
  id: 'Tromme-4',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/RS.mp3'
}, {
  keyTrigger: 'S',
  id: 'Tromme-5',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/OH25.mp3'
}, {
  keyTrigger: 'D',
  id: 'Tromme-6',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/MA.mp3'
}, {
  keyTrigger: 'Z',
  id: 'Tromme-7',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CY0010.mp3'
}, {
  keyTrigger: 'X',
  id: 'Tromme-8',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CH.mp3'
}, {
  keyTrigger: 'C',
  id: 'Tromme-9',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CB.mp3'
},
];

class Button extends React.Component {
constructor(props) {
  super(props);
  
  this.playSound = this.playSound.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  this.restoreOpacity = this.restoreOpacity.bind(this);
}

componentDidMount() {
  document.addEventListener('keydown', this.handleKeyPress);
}

componentWillUnmount() {
  document.removeEventListener('keydown', this.handleKeyPress);
}

handleKeyPress(e) {
  if (String.fromCharCode(e.keyCode) === this.props.keyTrigger) {
    document.getElementById(this.props.clipId).style.opacity = '0.7'; 
    this.playSound();
    setTimeout(() => this.restoreOpacity(), 300);
  }
}

playSound(e) {
  const sound = document.getElementById(this.props.keyTrigger);
  sound.play();
  this.props.updateDisplay(this.props.clipId.replace('-', ' ')); 
}

restoreOpacity() {
  document.getElementById(this.props.clipId).style.opacity = '1'; 
}

render() {
  return (
    <div className="drum-pad" id={this.props.clipId} onClick={this.playSound} >
        <audio className="clip" id={this.props.keyTrigger} src={this.props.clip}></audio>
        {this.props.keyTrigger}
    </div>
  )
}
}

export default class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    display: 'klikk på notat eller trykk på tastaturet'
  }
  
  this.displayClipName = this.displayClipName.bind(this);
  this.clearDisplay = this.clearDisplay.bind(this);
}

displayClipName(name) {
    this.setState({
      display: name
    });
  setTimeout(() => this.clearDisplay(), 1000);
}

clearDisplay() {
  this.setState({
      display: 'klikk på notat eller trykk på tastaturet'
    });
}

render() {
  let drumPad = notes.map((drumObj, i, padBankArr) => {
      return (
        <Button clipId={padBankArr[i].id} 
          clip={padBankArr[i].url}
          keyTrigger={padBankArr[i].keyTrigger} 
          updateDisplay={this.displayClipName} />
      )
    });
  
  return (
    <div id="drum-machine">
      <h1>TROMMEMASKIN</h1>
      <h3 id="display">
        {this.state.display}
      </h3>
      <div className="box">
        {drumPad}
      </div>
    </div>
  );
}
}

