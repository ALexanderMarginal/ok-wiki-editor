import {useDispatch, useSelect} from '@statirjs/react';
import {useMemo, useState} from 'react';

/**
 * @return {{
 * onInput: function,
 * close: function,
 * modalStyles: {},
 * inputs: {name: string, value: string, label: string}[],
 * withBack: boolean,
 * focusedInput: string|null,
 * setFocusedInput: function,
 * onSubmit: function,
 * back: function
 * }}
 */
export default function useLinkModal() {
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);
    const {text, link, isOpen, target, cb, withBack} = useSelect(root => root.linkModalForm);

    const [focusedInput, setFocusedInput] = useState(null);

    const modalStyles = useMemo(() => {
        return {
            left: target?.offsetLeft,
            top: target?.offsetTop + target?.offsetHeight,
        };
    }, [target]);

    const inputs = useMemo(() => {
        return [
            {
                name: 'link',
                value: link,
                label: 'URL',
            },
            {
                name: 'text',
                value: text,
                label: 'Text',
            },
        ];
    }, [link, text]);

    const onInput = e => {
        dispatchLinkModal({
            isOpen,
            link: e?.target?.name === 'link' ? e?.target?.value : link,
            text: e?.target?.name === 'text' ? e?.target?.value : text,
            target,
            cb,
        });
    };

    const close = e => {
        if (e.target.id === 'modalSubstrate') {
            dispatchLinkModal();
        }
    };

    const onSubmit = () => {
        cb(link, text);
        dispatchLinkModal();
    };

    return {
        onInput,
        close,
        modalStyles,
        inputs,
        focusedInput,
        setFocusedInput,
        onSubmit,
        withBack,
    };
}
