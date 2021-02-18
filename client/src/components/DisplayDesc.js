import React, { useState, useRef, useEffect, useContext } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Draft from 'draft-js';
import '../displaypan.css';
const { EditorState, convertFromRaw } = Draft;
const EMPTY_EDITOR_STATE = EditorState.createEmpty();

function DisplayDesc({ menu }) {
    const [plainText, setPlainText] = useState('');
    const [editorState, setEditorState] = useState(EMPTY_EDITOR_STATE);

    useEffect(() => {
        var tmpText = editorState.getCurrentContent().getPlainText('\u0001');
        // tmpText = tmpText.replace(/[^\x20-\x7E]/g, '. ');
        tmpText = tmpText.replace(/[\u0001-\u0002]/g, '. ');
        if (tmpText.charAt(0) == '.')
            tmpText = tmpText.substring(2);
        setPlainText(tmpText.substring(0, 124) + '....');
    }, [editorState]);

    useEffect(() => {
        if ((menu.description != undefined && menu.description != '' && menu.description.trim().length > 0)) {
            const newState = convertFromRaw(JSON.parse(menu.description));
            setEditorState(EditorState.createWithContent(newState));
        }
    }, [menu.description]);


    return (
        <div>
            {plainText}
        </div>
    );
};

export default DisplayDesc;
