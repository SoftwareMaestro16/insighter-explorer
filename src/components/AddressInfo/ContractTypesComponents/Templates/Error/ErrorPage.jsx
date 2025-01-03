import styles from "./ErrorPage.module.scss";

function ErrorPage() {

    return (
        <>
            <div className={styles.error}>
                    <h2>Address not found or invalid</h2>
                    <h3>The provided address does not contain any data or balance.</h3>
                    <button onClick={() => handleNavigation('/')}>Back</button>
            </div>
        </>
    );
}

export default ErrorPage;