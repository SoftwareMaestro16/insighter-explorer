import styles from './JettonMaster.module.scss';

function JettonMaster({ address, contractInterface }) {

    return (
      <>
        <h2>{address}</h2>
        <h2>{contractInterface}</h2>
      </>
    );
}

export default JettonMaster;