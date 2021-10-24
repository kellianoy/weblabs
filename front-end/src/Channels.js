
/** @jsxImportSource @emotion/react */
import {useState, useEffect} from 'react';
import axios from 'axios';
import * as React from 'react';
// Layout
import ResponsiveDrawer from "./responsiveDrawer"


export default function Channels({
  onChannel
}) {
  const [channels, setChannels] = useState([])
  useEffect( () => {
    const fetch = async () => {
      const {data: channels} = await axios.get('http://localhost:3001/channels')
      setChannels(channels)
    }
    fetch()
  }, [])
  return(
    <ResponsiveDrawer channels={channels} onChannel={onChannel} />
  )
}

