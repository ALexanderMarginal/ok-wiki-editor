import {useDispatch} from '@statirjs/react';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {useEffect, useRef} from 'react';
import {throttle} from 'lodash';

window.targets = [];

/**
 * @return {{editor: Editor, editorRef: React.MutableRefObject<null>}}
 */
export default function useTiptap() {
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
    const dispatchLinkContextMenu = useDispatch(dispatch => dispatch.linkContextMenu.toggle);
    const editorRef = useRef(null);

    const onMouseMove = e => {
        const showContextMenu = e.target.localName === 'a';
        dispatchLinkContextMenu({
            isShow: showContextMenu,
            target: showContextMenu ? e.target : null,
        });
    };

    const onMouseMoveDebounced = throttle(onMouseMove, 2000);

    useEffect(() => {
        const {current} = editorRef;
        if (current) {
            current.addEventListener('mousemove', onMouseMoveDebounced);
        }
        return () => {
            if (current) {
                current.removeEventListener('mousemove', onMouseMoveDebounced);
            }
        };
    }, [editorRef, onMouseMoveDebounced]);

    return {editor, editorRef};
}
