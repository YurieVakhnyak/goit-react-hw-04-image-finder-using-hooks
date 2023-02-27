import React, { Component } from 'react';
import css from '../Modal/Modal.module.css';
// import ReactHtmlParser from 'react-html-parser';

export class Modal extends Component {
  componentDidMount() {
    // console.log('DidMount');
  }

  componentWillUnmount() {
    // console.log('WillUnmount');
  }

  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
