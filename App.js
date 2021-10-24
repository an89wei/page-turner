import react from 'react';
import page from './page_1.png'
import nextpage from './page_2.png'

console.log(page, nextpage);

function Image() {
  return (
    <img src={page} alt="Page" />);                        //Displaying first image
}

function NewImage() {
  return (
    <img src={nextpage} alt="NextPage" />);                //Displaying second image
}

class Button extends react.Component {                     //creating button to start speech recognition
  constructor(props) {
    super(props)
    this.state = {isRecognizing: false}
    this.state = {isNext: false}
    this.handleClick = this.handleClick.bind(this)

    this.word = '';

    this.recognition = new window.webkitSpeechRecognition(); //speech recognition api
    this.recognition.continuous = true; 
    this.recognition.interimResults = false;
    this.recognition.onresult = this.handleOnResult.bind(this)
  }
  
  handleOnResult(event) {                                 //creating function to set this.word
    this.word = event.results[0][0].transcript;
    console.log(event.results);
    this.setState({isNext: this.word.toLowerCase().includes('next') });  
  }
  
  handleClick() {                                        //creating function to code for start/stop button
    this.setState({isRecognizing: !this.state.isRecognizing}, () => {
      console.log(this.state.isRecognizing); 
      if (this.state.isRecognizing) {
        this.recognition.start();
      }
      else {
        this.recognition.stop()
      }
    })
  };

  render() {                                            //changing button prompt, turning pages
    return (
      <div>
        <button onClick = {this.handleClick}>{this.state.isRecognizing ? 'Stop':'Start'}
        </button>

        {this.state.isNext ? <NewImage></NewImage>:<Image></Image>}
      </div>
   )
  };
}

export default Button
