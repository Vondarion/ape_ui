import React from 'react';
import ReactDOM from 'react-dom';
import SockJsClient from 'react-stomp';
import './index.css';


class Ape extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div><Chat></Chat></div>
    );
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [{text:"Hello", sender:"A"},{text:"Hi!", sender:"B"}], text: 'Enter it' };
    this.handleChangeChatMessageText = this.handleChangeChatMessageText.bind(this);
    this.handleSubmitChatMessage = this.handleSubmitChatMessage.bind(this);
  }
  // constructor(props) {
  //   super(props);
  //   this.messages = [{sender:"Florian", text:"Hallo!"}, {sender:"Katrin", text:"Hallo!"}]
  //   this.message = {
  //     text: "write something"
  //   }
  //   //Array(9).fill(null),
  // }

  // renderMessage(message) {
  //    return <ChatMessage />
  // }

  handleSubmitChatMessage(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newMessage = {
      text: this.state.text,
      sender: "Ape",
      id: Date.now()
    };

    this.setState(state => ({
      messages: state.messages.concat(newMessage),
    }));
    console.log("setState for messages called");

    this.sendMessage = () => {
      this.clientRef.sendMessage('/topic/public', newMessage);
      console.log("sendMessage to socket" + {newMessage});
    }
    console.log("handleSubmitChatMessage done");
   
  }

  handleChangeChatMessageText(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="chat">
        <div>
          <ChatMessageList messages={this.state.messages}/>
        </div>
       <div>
         <ChatMessageInput text={this.state.text} 
         handleChangeChatMessageText={this.handleChangeChatMessageText} 
         handleSubmitChatMessage={this.handleSubmitChatMessage} />
       </div>
      </div>
    );
  }
}

class ChatMessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.messages.map(item => (
            <ChatMessage message={item}></ChatMessage>
          ))}
        </div>
        <div>
          <SockJsClient url='http://localhost:8080/chat' topics={['/topic/public']}
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { this.clientRef = client }} />
        </div>
       </div>
    );
  }
}

class ChatMessageInput extends React.Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    return (
      <p>
        <form onSubmit={this.props.handleSubmitChatMessage}>
          <label htmlFor="new-chat-message">
            Tell it as it is
          </label>
          <input
            id="new-chat-message"
            onChange={this.props.handleChangeChatMessageText}
            value={this.props.text}
          />
          <button>
            Send
          </button>
        </form>
      </p>
    );
  }

 
}

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
        Sender <span className="sender">{this.props.message.sender}</span> Text <span className="text">{this.props.message.text}</span>
      </div>
    );
  }
}


  

  
// ========================================

ReactDOM.render(
  <Ape />,
  document.getElementById('root')
);
  