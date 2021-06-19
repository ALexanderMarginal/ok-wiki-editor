import React from 'react';
import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import './Tiptap.scss';
import 'remixicon/fonts/remixicon.css';
import MenuBar from './MenuBar';

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Table,
            TableRow,
            TableCell,
            TableHeader,
            Link,
        ],
        content: '<p>Hello World! 🌎️</p>',
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
