import styles from './JettonWallet.module.scss';

function JettonWallet({ address, contractInterface }) {

    return (
      <>
        <h2>{address}</h2>
        <h2>{contractInterface}</h2>
      </>
    );
}

export default JettonWallet;