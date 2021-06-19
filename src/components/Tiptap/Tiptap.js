import {useSelect} from '@statirjs/react';
import React from 'react';
import {EditorContent} from '@tiptap/react';
import './Tiptap.scss';
import 'remixicon/fonts/remixicon.css';
import LinkContextMenu from '../LinkContextMenu';
import LinkModal from '../LinkModal';
import useTiptap from './hooks/useTiptap';
import MenuBar from './MenuBar';

const Tiptap = () => {
    const {editor, editorRef} = useTiptap();
    const isOpenLinkModal = useSelect(root => root.linkModalForm.isOpen);
    const isShowLinkContextMenu = useSelect(root => root.linkContextMenu.isShow);
    return (
        <div>
            <MenuBar editor={editor} />
            <div id="editor" ref={editorRef}>
                <EditorContent editor={editor} />
            </div>
            {isOpenLinkModal ? <LinkModal /> : null}
            {isShowLinkContextMenu ? <LinkContextMenu editor={editor} editorRef={editorRef} /> : null}
        </div>
    );
};

export default Tiptap;
