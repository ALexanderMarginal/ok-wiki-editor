import './App.css';
import {useSelect} from '@statirjs/react';
import Tiptap from './components/Tiptap';
import LinkModal from './components/LinkModal';

function App() {
    const isOpen = useSelect(root => root.linkModalForm.isOpen);
    return (
        <div className="App">
            <Tiptap />
            {isOpen ? <LinkModal /> : null}
        </div>
    );
}

export default App;
