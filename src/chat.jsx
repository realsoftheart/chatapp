import React, { useEffect } from 'react'
import { Avater, IconButton } from '@material-ui/core';
import { useState } from 'react';
import AttachFile from '@material-ui/icons/AttachFile';
import SearchOutline from '@material-ui/icons/SearchOutline';
import { useStateValue } from './StateProvider';
import MoreVert from '@material-ui/icons/MoreVert';
import EmojiEmotionIcon from '@material-ui/icons/EmojiEmotion';
import MicIcon from '@material-UI/icons/Mic';
import sendIcon from '@material-ui/icons/Send';
import './Chat.css';
import { useParam } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from './firebase';

function chat() {
    const [input, setInput] = useState("");
    const [speed, setSpeed] = useState("");
    const {roomId} = useParam();
    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState([]);
    const [{ user }, dispatch] = useStateValue();
}
    

