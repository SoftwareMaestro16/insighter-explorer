import styles from './NftCollection.module.scss';

function NftCollection({ address, contractInterface }) {

    return (
      <>
        <h2>{address}</h2>
        <h2>{contractInterface}</h2>
      </>
    );
}

export default NftCollection;