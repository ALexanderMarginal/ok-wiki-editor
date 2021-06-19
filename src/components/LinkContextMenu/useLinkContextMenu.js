import {useDispatch, useSelect} from '@statirjs/react';
import {useMemo} from 'react';

/**
 * @param {HTMLElement} area
 * @param {HTMLElement} el
 * @return {{start: number, end: number}}
 */
const getPositions = (area, el) => {
    const targetText = el.innerText;
    const start = area.innerText.indexOf(targetText);
    const end = start + targetText.length;
    return {start, end};
}

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
                    const {start, end} = getPositions(editorRef.current, target);
                    dispatchLinkModal({
                        isOpen: true,
                        text: target.innerText,
                        target: target,
                        link: target.getAttribute('href'),
                        withBack: true,
                        cb: (link, text) => {
                            debugger;
                            editor.chain()
                                .focus(end)
                                .unsetLink()
                                .deleteRange(start, end)
                                .focus(start)
                                .insertContent(text)
                                .setTextSelection({start, to: start + text.length + 1})
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
                    const {end} = getPositions(editorRef.current, target);
                    editor.chain()
                        .focus(end)
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
