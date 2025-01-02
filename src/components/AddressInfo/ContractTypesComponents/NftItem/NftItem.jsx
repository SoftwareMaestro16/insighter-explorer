import styles from './NftItem.module.scss';

function NftItem({ address, contractInterface }) {

    return (
      <>
        <h2>{address}</h2>
        <h2>{contractInterface}</h2>
      </>
    );
}

export default NftItem;