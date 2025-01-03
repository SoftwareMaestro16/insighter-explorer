import styles from "./ContractMenu.module.scss";

function ContractMenu({ activeTab, setActiveTab }) {
    const menuItems = ["History", "Tokens", "Collectibles", "Methods"];

    return (
        <div className={styles.menuContainer}>
            {menuItems.map((item) => (
                <h2
                    key={item}
                    className={activeTab === item ? styles.active : ""}
                    onClick={() => setActiveTab(item)}
                >
                    {item}
                </h2>
            ))}
        </div>
    );
}

export default ContractMenu;