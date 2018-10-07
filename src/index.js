import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Ape extends React.Component {
  render() {
    return (
      <div className="ape">
        <div className="ape-chat">
          <Chat />
        </div>
        <div className="ape-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class Chat extends React.Component {
  renderMessage(message) {
    return <ChatMessage />
  }

  render() {
    return (
      <div className="chat">
        <div className="log">
          {this.renderMessage(message)}
        </div>
        <div className="text">
        <button className="send">{/* TODO */}</button></div>
      </div>
    );
  }
}


  

  
// ========================================

ReactDOM.render(
  <Chat />,
  document.getElementById('root')
);
  