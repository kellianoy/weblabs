import {useState} from 'react';
import './App.css';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

//Imports
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#373B44',
  }
}

export default ({
}) =>{
  return (
    <div className="App" css={styles.root}>
      { Header() } 
      { Main() }
      { Footer()}
    </div>
  );
}

