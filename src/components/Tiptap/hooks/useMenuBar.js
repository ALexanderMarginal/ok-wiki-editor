import {useDispatch} from '@statirjs/react';
import {useMemo} from 'react';

const useMenuBar = (editor) => {
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);

    const buttons = useMemo(() => {
        return editor ? [
            {
                id: 'link',
                title: 'Link',
                icon: 'ri-link',
                action: () => {
                    dispatchLinkModal({isOpen: true});
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
                id: 'clearNodes',
                title: 'Clear',
                icon: 'ri-file-line',
                action: () => editor.chain().focus().clearNodes().run(),
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
                id: 'code',
                title: 'code',
                icon: 'ri-code-view',
                action: () => editor.chain().focus().toggleCode().run(),
                withActiveClass: true,
            },
            {
                id: 'plus',
                title: 'More',
                icon: 'ri-add-line',
                action: () => window.alert('More actions'),
            },
        ].map(button => ({...button, key: `${button.id}_${button.title}`})) : [];
    }, [editor, dispatchLinkModal]);

    return {buttons};
};

export default useMenuBar;
