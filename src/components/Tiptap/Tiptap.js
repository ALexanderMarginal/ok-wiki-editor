import React from 'react';
import {EditorContent} from '@tiptap/react';
import './Tiptap.scss';
import 'remixicon/fonts/remixicon.css';
import useTiptap from './hooks/useTiptap';
import MenuBar from './MenuBar';

const Tiptap = () => {
    const {editor, editorRef} = useTiptap();

    return (
        <div>
            <MenuBar editor={editor} />
            <div id="editor" ref={editorRef}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Tiptap;
