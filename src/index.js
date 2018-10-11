import React from 'react';
import ReactDOM from 'react-dom';
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
    this.state = { messages: [], text: '' };
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

  render() {
    return (
      <div className="chat">
        <div>
          <ChatMessageList messages={this.state.messages}/>
        </div>
       <div>
         <ChatMessageInput />
       </div>
      </div>
    );
  }
}

class ChatMessageList extends React.Component {
  constructor(props) {
    super(props);
    this.chat = { messages: [{text:"Hello", sender:"A"},{text:"Hi!", sender:"B"}] };
  }

  render() {
    return (
      <div>
        {this.chat.messages.map(item => (
          <ChatMessage message={item}></ChatMessage>
        ))}
      </div>
      
    );
  }
}

class ChatMessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.message = {
      sender:"Florian", 
      text:"Hallo!",
    };
    this.handleChangeChatMessageText = this.handleChangeChatMessageText.bind(this);
    this.handleSubmitChatMessage = this.handleSubmitChatMessage.bind(this);
  }

  render() {
    return (
      <p>
        <form onSubmit={this.handleSubmitChatMessage}>
          <label htmlFor="new-chat-message">
            Tell it as it is
          </label>
          <input
            id="new-chat-message"
            onChange={this.handleChangeChatMessageText}
            value={this.message.text}
          />
          <button>
            Send
          </button>
        </form>
      </p>
    );
  }

  handleSubmitChatMessage(e) {
    e.preventDefault();
    if (!this.message.text.length) {
      return;
    }
    const newMessage = {
      text: this.message.text,
      sender: "Ape",
      id: Date.now()
    };

    this.addMessage(message => ({
      items: message.items.concat(newMessage),
      text: ''
    }));
  }

  handleChangeChatMessageText(e) {
    this.setState({ text: e.target.value });
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
  