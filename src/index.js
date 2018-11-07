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
    this.state = { clientConnected: false, messages: [{content:"Hello", sender:"A"},{content:"Hi!", sender:"B"}], text: 'Enter it' };
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
      type: 'CHAT',
      content: this.state.text,
      sender: "Ape"
    };

    this.setState(state => ({
      messages: state.messages.concat(newMessage),
    }));
    console.log("setState for messages called");

    this.sendMessage(newMessage);
    console.log("handleSubmitChatMessage done");
   
  }

  sendMessage(message) {
    console.log("sendingMessage to socket" + {message});
    this.clientRef.sendMessage('/app/chat', JSON.stringify(message));
    console.log("sendMessage to socket" + {message});
  }

  handleChangeChatMessageText(e) {
    this.setState({ text: e.target.value });
    console.log("Message text changed:" + e.target.value)
  }

  onMessageReceive = (msg, topic) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }))
    // this.setState(prevState => ({
    //   messages: [...prevState.messages, msg]
    // }));
    console.log(msg);
  }


  render() {
    const wsSourceUrl = "http://localhost:8080/ws"; //window.location.protocol + "//" + window.location.host + "/ws";
    return (
      <div className="chat">
        <div>
          <ChatMessageList messages={this.state.messages}/>

        <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => { this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ true }/>

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
        Sender <span className="sender">{this.props.message.sender}</span>: <span className="text">{this.props.message.content}</span>
      </div>
    );
  }
}


  

  
// ========================================

ReactDOM.render(
  <Ape />,
  document.getElementById('root')
);
  