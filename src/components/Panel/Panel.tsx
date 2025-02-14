import styles from "./Panel.module.css";
import closeIcon from "/clear.svg";

type PanelProps = {
  openButtonText: string;
  clearButtonText: string;
  isPanelOpen: boolean;
  onClose: () => void;
  setIsPanelOpen: (value: boolean) => void;
  children: React.ReactNode;
  onClick: () => void;
  hideClearButton?: boolean;
};

export const Panel = ({
  openButtonText,
  clearButtonText,
  isPanelOpen,
  onClose,
  setIsPanelOpen,
  children,
  onClick,
  hideClearButton,
}: PanelProps) => {
  return (
    <>
      <button onClick={() => setIsPanelOpen(true)}>{openButtonText}</button>
      <div
        className={`${styles.panelOverlay} ${isPanelOpen ? styles.open : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.panel} ${isPanelOpen ? styles.open : ""}`}>
        <div className={styles.panelHeader}>
          <h2>Filters</h2>
          <img
            src={closeIcon}
            alt='Close'
            style={{ "height": "15px" }}
            onClick={onClose}
          />
        </div>
        <div className={styles.panelContent}>{children}</div>
        <div className={styles.panelButtonContainer}>
          {!hideClearButton && (
            <button
              onClick={onClick}
              className='clear'>
              {clearButtonText}
            </button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};
