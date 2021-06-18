import './App.css';
import {useSelect} from '@statirjs/react';
import Tiptap from './components/Tiptap';

function App() {
    const isOpen = useSelect(root => root.linkModalForm.isOpen);
    console.log(isOpen);
    return (
        <div className="App">
            <Tiptap />
        </div>
    );
}

export default App;
