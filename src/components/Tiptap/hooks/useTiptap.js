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
import debounce from '../../../tools/debounce';

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
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);
    const editorRef = useRef(null);

    const onMouseMove = e => {
        if (e.target.localName === 'a') {
            return;
            dispatchLinkModal({})
        }
    };

    const onMouseMoveDebounced = debounce(onMouseMove, 1000);

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
