import React, { useState, useRef, useEffect } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Draft from 'draft-js';
import '../index.css';
import {
    Row,
    Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from 'react-icons/md';
import { convertToHTML } from 'draft-convert'
const { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState, convertFromHTML } = Draft;

const Immutable = require('immutable');

// class Editpan extends React.Component {

function Detail(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const menu = props.menu;
    const setDetail = props.setDetail;

    // useEffect(() => {
    //     // debugger;
    //     // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    //     // const val = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    //     // if (val != undefined && val != null && val != "\n") {
    //     //     const val = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    //     //     setMenu({ ...menu, description: val });
    //     // }
    // }, [editorState])

    useEffect(() => {
        // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        debugger;

        if (menu.description == null || menu.description.length < 1) {

            // const newState = convertFromRaw(JSON.parse(menu.description));
            setEditorState(EditorState.createEmpty());
        }

        else {
            // const blocksFromHTML = convertFromHTML(menu.description);
            // const newState = ContentState.createFromBlockArray(
            //     blocksFromHTML.contentBlocks,
            //     blocksFromHTML.entityMap,
            // );
            const newState = convertFromRaw(JSON.parse(menu.description));
            // const state = ContentState.createFromBlockArray(blocksFromHTML);
            setEditorState(EditorState.createWithContent(newState));
        }

        // setEditorState(newState);
    }, [menu.description])

    const goBack = () => {

    }

    // const refEditor = useRef()
    // const focusEditorInput = () => refEditor.current.focus();
    const onChange = (newEditorState) => {
        console.log('kik', editorState.getCurrentInlineStyle())
        setEditorState(newEditorState)
    };
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className="RichEditor-root">
            <Row>
                <Col sm="10">
                    <Link to='#!' onClick={() => setDetail(
                        {
                            isDetail: false
                        })}
                        className=' flow-right'>
                        <MdArrowBack color='Black' size='3rem' />
                    </Link>
                </Col>
                <Col sm="2">
                    <Link to='#!' onClick={() => setDetail(
                        {
                            isDetail: false
                        })}
                        className=' flow-right'>
                        <MdArrowBack color='Black' size='3rem' />
                    </Link>
                </Col>

            </Row>
            <div className={className}>
                <Editor
                    readOnly={true}
                    // ref={refEditor}
                    editorState={editorState}
                    onChange={(editorState) => onChange(editorState)}
                    // placeholder="Tell a story..."
                    placeholder=""
                />
            </div>
        </div>
    );
}

export default Detail;


