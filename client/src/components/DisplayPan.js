import React, { useState, useRef, useEffect } from 'react';
// import { Editor, EditorState } from 'draft-js';
import Draft from 'draft-js';
import '../index.css';
const { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState, convertFromHTML } = Draft;

const Immutable = require('immutable');
function Displaypan(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const setMenu = props.setMenu;
    const menu = props.menu;

    useEffect(() => {
        debugger;
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const val = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        if (val != undefined && val != null && val != "\n") {
            const val = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            setMenu({ ...menu, description: val });
        }
    }, [editorState])

    useEffect(() => {
        if (menu.description == null || menu.description.length < 1) {
            setEditorState(EditorState.createEmpty());
        }

        else {
            const newState = convertFromRaw(JSON.parse(menu.description));
            // const state = ContentState.createFromBlockArray(blocksFromHTML);
            setEditorState(EditorState.createWithContent(newState));
        }
    }, [menu.description])
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
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className="ToolbarContainer">
            <BlockStyleControls
                editorState={editorState}
                onBToggle={toggleBlockType}
                onIToggle={toggleInlineStyle}
            />

            <div className="RichEditor-root" >
                <div className={className} onClick={focusEditorInput}>
                    <Editor
                        readOnly={true}
                        ref={refEditor}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        onChange={(editorState) => onChange(editorState)}
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
                    : this.props.active ? <strong>{this.props.label}</strong> : <weak>{this.props.label}</weak>}
                {/* : <strong>{this.props.label}</strong>} */}
            </span>
        );
    }
}

const BLOCK_TYPES = [

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

var INLINE_STYLES = [];

export default Displaypan;
