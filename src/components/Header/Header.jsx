import { useState } from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  }

  const closeMenu = () => setMenuOpen(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <div>
        <header>
          <nav className={styles.navStyle}>
            <div className={styles.leftPart} onClick={() => handleNavigation('/')}>
              <h1 className={styles.insighterText}>Insighter</h1>
              <img className={styles.insighterLogo} src="/in-logo.png" alt="Insighter Logo" />
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
            <div className={`${styles.rightPart} ${menuOpen ? styles.menuOpen : ''}`}>
                <h1>
                    <a
                    href="https://docs.tonconsole.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Docs
                    </a>
                </h1>
                <h1 onClick={() => handleNavigation('/stats')}>
                    STATS
                </h1>
                <h1>
                    <a
                    href="https:/t.me/SoftwareMaestro"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Support
                    </a>
                </h1>
            </div>
          </nav>
        </header>
        {menuOpen && (
          <div className={styles.overlay} onClick={closeMenu}></div> 
        )}  
    </div>
  );
}

export default Header;