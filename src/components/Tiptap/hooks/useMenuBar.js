import {useDispatch} from '@statirjs/react';
import {useMemo} from 'react';

/**
 * @param {Editor} editor
 * @return {{buttons: {id: string, title: string, icon: string, action: function}[]}}
 */
const useMenuBar = (editor) => {
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);
    const dispatchLinkContextMenu = useDispatch(dispatch => dispatch.linkContextMenu.toggle);

    const buttons = useMemo(() => {
        return editor ? [
            {
                id: 'link',
                title: 'Link',
                icon: 'ri-link',
                action: e => {
                    dispatchLinkContextMenu();
                    const {state} = editor;
                    const {from, to} = state.selection;
                    const text = state.doc.textBetween(from, to, ' ');
                    dispatchLinkModal({
                        isOpen: true,
                        text,
                        target: e.currentTarget,
                        cb: (link, text) => {
                            editor.chain().focus()
                                .deleteRange(from, to)
                                .insertContent(text)
                                .setTextSelection({from, to: from + text.length})
                                .setLink({ href: link })
                                .run();
                        },
                    });
                },
            },
            {
                id: 'image',
                title: 'Image',
                icon: 'ri-image-line',
                action: () => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setImage({src: url}).run();
                    }
                },
            },
            {
                id: 'clearContent',
                title: 'Clear',
                icon: 'ri-file-line',
                action: () => editor.chain().focus().clearContent().run(),
            },
            {
                id: 'video',
                title: 'Video',
                icon: 'ri-vidicon-line',
                action: () => window.alert('Добавили видео'),
            },
            {
                id: 'table',
                title: 'Table',
                icon: 'ri-grid-line',
                action: () => {
                    const rows = window.prompt('Rows') || 2;
                    const cols = window.prompt('Cols') || 2;
                    editor.chain().focus().insertTable({rows, cols, withHeaderRow: true}).run();
                },
            },
            {
                id: 'plus',
                title: 'More',
                icon: 'ri-add-line',
                action: () => window.alert('More actions'),
            },
        ].map(button => ({...button, key: `${button.id}_${button.title}`})) : [];
    }, [editor, dispatchLinkModal, dispatchLinkContextMenu]);

    return {buttons};
};

export default useMenuBar;
