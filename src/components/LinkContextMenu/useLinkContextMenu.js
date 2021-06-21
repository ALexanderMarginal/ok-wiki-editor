import {useDispatch, useSelect} from '@statirjs/react';
import {useMemo} from 'react';

/**
 * @param {HTMLElement} area
 * @param {string} text
 * @return {{start: number, end: number}}
 */
const getPositions = (area, text) => {
    const start = area.innerText.indexOf(text);
    const end = start + text.length;
    return {start, end};
};

/**
 * @param {Editor} editor
 * @param {{current: HTMLElement}} editorRef
 * @return {{
 * buttons: {title: string, icon: string, action: function}[],
 * modalStyles: {left: number, top: number},
 * }}
 */
export default function useLinkContextMenu(editor, editorRef) {
    const {target} = useSelect(root => root.linkContextMenu);
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);
    const dispatchLinkContextMenu = useDispatch(dispatch => dispatch.linkContextMenu.toggle);

    const buttons = useMemo(() => {
        return [
            {
                title: 'Open Link',
                icon: 'ri-external-link-fill',
                action: () => window.open(target.href, target.target),
            },
            {
                title: 'Other',
                icon: 'ri-links-line',
                action: () => {
                },
            },
            {
                title: 'Edit link',
                icon: 'ri-pencil-line',
                action: () => {
                    const {start, end} = getPositions(editorRef.current, target.innerText);
                    dispatchLinkModal({
                        isOpen: true,
                        text: target.innerText,
                        target: target,
                        link: target.getAttribute('href'),
                        withBack: true,
                        cb: (link, text) => {
                            editor.chain()
                                .focus()
                                .setTextSelection({from: start + 1, to: end + 1})
                                .deleteSelection()
                                .insertContent(text)
                                .run();

                            const {start: textStart, end: textEnd} = getPositions(editorRef.current, text);
                            editor.chain()
                                .focus()
                                .setTextSelection({from: textStart + 1, to: textEnd + 1})
                                .setLink({ href: link })
                                .run();
                        },
                    });
                    dispatchLinkContextMenu();
                },
            },
            {
                title: 'Unlink',
                icon: 'ri-link-unlink-m',
                action: () => {
                    const {start, end} = getPositions(editorRef.current, target.innerText);
                    editor.chain()
                        .focus()
                        .setTextSelection({from: start + 1, to: end + 1})
                        .unsetLink()
                        .focus(end + 1)
                        .run();
                },
            },
        ];
    }, [dispatchLinkModal, target, editorRef, editor, dispatchLinkContextMenu]);

    const modalStyles = useMemo(() => {
        const {left, top} = target.getBoundingClientRect();
        return {
            left: left,
            top: top + 18,
        };
    }, [target]);

    return {buttons, modalStyles};
}
