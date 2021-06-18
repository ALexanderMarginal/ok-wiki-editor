import {useDispatch, useSelect} from '@statirjs/react';

const useMenuBar = (editor) => {
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);
    dispatchLinkModal({isOpen: true});

    const buttons = [
        {
            id: 'link',
            title: 'Link',
            icon: 'ri-link',
            action: () => {

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
    ];
};

export default useMenuBar;
