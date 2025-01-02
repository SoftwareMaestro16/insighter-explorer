import { useState } from 'react';
import styles from './CopyButton.module.scss';

function CopyButton({ textToCopy }) {
    const [copyIcon, setCopyIcon] = useState('/copy-icon.svg');

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyIcon('/success-copy-icon.svg'); 
            setTimeout(() => setCopyIcon('/copy-icon.svg'), 3000); 
        });
    };

    return (
        <button 
            onClick={handleCopy} 
            className={styles.copyButton}
            title="Copy Address"
        >
            <img src={copyIcon} alt="Copy" />
        </button>
    );
}

export default CopyButton;