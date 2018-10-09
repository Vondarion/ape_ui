import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], text: '' };
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
  //   return <ChatMessage />
  // }

  render() {
    return (
      <div className="chat">
        <div>
          <ChatMessageList messages={this.chat.messages}/>
        </div>
       <div>
         <ChatMessageInput />
       </div>
      </div>
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

class ChatMessageList extends React.Component {
  constructor(props) {
    super(props);
    this.chat = { messages: [], text: '' };
    this.handleChangeChatMessageText = this.handleChangeChatMessageText.bind(this);
    this.handleSubmitChatMessage = this.handleSubmitChatMessage.bind(this);
  }
}

class ChatMessageInput extends React.Component {
  render() {
    return (
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
    );
  }
}

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.message = {
      sender:"Florian", 
      text:"Hallo!",
    }
  }

  render() {
    return (
      <div className="message">
      <div className="sender">Florian</div>
      <div className="text">Guten morgen</div>
      </div>
    );
  }
}


  

  
// ========================================

ReactDOM.render(
  <Ape />,
  document.getElementById('root')
);
  