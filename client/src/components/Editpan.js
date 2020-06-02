import React, { useState, useRef, useEffect, useContext } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Draft from 'draft-js';
import { store } from "./Store";
import '../index.css';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    FormGroup,
    Label,
    Card,
    CardImg,
} from "reactstrap";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatListBulleted, MdFormatListNumbered, MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight } from 'react-icons/md';
import { convertToHTML } from 'draft-convert'
const { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState, convertFromHTML } = Draft;

const Immutable = require('immutable');

const EMPTY_EDITOR_STATE = EditorState.createEmpty();

// class Editpan extends React.Component {

function Editpan({ menu, setMenu }) {
    const [draftMenu, setDraftMenu] = useState(menu);

    const [editorState, setEditorState] = useState(EMPTY_EDITOR_STATE);
    const shareContext = useContext(store);

    useEffect(() => {
        // debugger;
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const val = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n').trim();
        if (val != null) {
            const val = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            setDraftMenu(draftMenu => ({ ...draftMenu, description: val }));
            shareContext.dispatch({
                type: "setMenuDescription",
                value: val
            });
        }
    }, [editorState])

    useEffect(() => {
        // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        // debugger;

        if (menu.description == '' || menu.description.trim().length < 1) {

            // const newState = convertFromRaw(JSON.parse(menu.description));
            setEditorState(EMPTY_EDITOR_STATE);
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



    // constructor(props) {
    //     super(props);
    //     this.state = { editorState: EditorState.createEmpty() };
    //     this.focus = () => this.refs.editor.focus();
    // }
    const refEditor = useRef()
    const focusEditorInput = () => refEditor.current.focus();
    const onChange = (newEditorState) => {
        console.log('kik', editorState.getCurrentInlineStyle())
        setEditorState(newEditorState)
    };
    const toggleBlockType = (blockType) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            ));
    }

    const toggleInlineStyle = (inlineStyle) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    };

    const makeBold = () => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                "BOLD"
            )
        )
    }
    // render() {
    // const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className="ToolbarContainer">


            <div className="RichEditor-root" >
                {/* <Button onClick={makeBold}>Bold</Button> */}
                <BlockStyleControls
                    editorState={editorState}
                    onBToggle={toggleBlockType}
                    onIToggle={toggleInlineStyle}
                />
                {/* <InlineStyleControls
                editorState={editorState}
                onIToggle={toggleInlineStyle}
            /> */}
                <div className={className} onClick={focusEditorInput}>
                    <Editor ref={refEditor}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        onChange={(editorState) => onChange(editorState)}
                        // placeholder="Tell a story..."
                        placeholder=""

                        blockRenderMap={extendedBlockRenderMap}
                    />
                </div>
            </div>
        </div>
    );
}



const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};


function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        case 'new-block-type-name':
            return {
                component: CustomComponent,
                editable: false,
            }
        default: return null;
    }
}

const CustomComponent = (props, ...other) => {
    return <div>
        <span> 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥  </span>
        {props.children}
        <span> 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥  </span>
    </div>
}
const blockRenderMap = Immutable.Map({
    'new-block-type-name': {
        element: CustomComponent
    }
});

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    };

    render() {
        let className = 'RichEditor-styleButton';
        let actColor = 'black';
        let emp = 'weak';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
            actColor = "red";
            emp = 'strong';
        }

        return (

            <span className={className} onMouseDown={this.onToggle}>
                &nbsp;
                {this.props.icon != undefined ?
                    < this.props.icon color={actColor} size='1.2rem' />
                    : this.props.active ? <strong>{this.props.label}</strong> : <span>{this.props.label}</span>}
                {/* : <strong>{this.props.label}</strong>} */}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    // { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item', icon: MdFormatListBulleted },
    { label: 'OL', style: 'ordered-list-item', icon: MdFormatListNumbered },
    // { label: 'Code Block', style: 'code-block' },
    // { label: 'Fire', style: 'new-block-type-name' }
];

const BlockStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    icon={type.icon}
                    onToggle={props.onBToggle}
                    style={type.style}
                />
            )}
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    icon={type.icon}
                    onToggle={props.onIToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: MdFormatBold },
    { label: 'Italic', style: 'ITALIC', icon: MdFormatItalic },
    { label: 'Underline', style: 'UNDERLINE', icon: MdFormatUnderlined },
    // { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    // var currentStyle = props.editorState.getCurrentInlineStyle();
    // return (
    //     <div className="RichEditor-controls">
    //         {INLINE_STYLES.map(type =>
    //             <StyleButton
    //                 key={type.label}
    //                 active={currentStyle.has(type.style)}
    //                 label={type.label}
    //                 icon={type.icon}
    //                 onToggle={props.onToggle}
    //                 style={type.style}
    //             />
    //         )}
    //     </div>
    // );
};

// ReactDOM.render(
// 	<RichEditorExample />,
// 	document.getElementById('target')
// );

export default Editpan;




// import {
//     styleMap,
//     getBlockStyle,
//     BLOCK_TYPES,
//     BlockStyleControls
// } from "./blockStyles/BlockStyles";
// import StyleButton from "./blockStyles/BlockStyles"

// function Editpan(props) {
//     const [editorState, setEditorState] = useState(EditorState.createEmpty());
//     const onChange = (newEditorState) => {
//         const letter = getCurrentLetter(newEditorState);
//         if (getCurrentBlock(newEditorState).getText().length > 9) {
//             setEditorState(editorState);
//             return;
//         }
//         setEditorState(newEditorState)
//     }
//     function getCurrentBlock(editorState) {
//         const currentSelection = editorState.getSelection();
//         const blockKey = currentSelection.getStartKey();
//         return (editorState.getCurrentContent().getBlockForKey(blockKey));
//     }

//     function getCurrentLetter(editorState) {
//         const currentBlock = getCurrentBlock(editorState);
//         const blockText = currentBlock.getText();
//         return blockText[editorState.getSelection().getStartOffset() - 1];
//     }

//     return (
//         <div>
//             <Editor
//                 blockStyleFn={getBlockStyle}
//                 editorState={editorState}
//                 onChange={onChange}
//             />
//         </div>

//     );
// }

// export default Editpan;


