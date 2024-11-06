import { useState } from "react";
import styles from "./app.module.css";
import dateFormat from "dateformat";

export const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const onInputButtonClick = () => {
    const promptValue = prompt();
    if (promptValue !== null && promptValue.length >= 3) {
      setError("");
      setValue(promptValue);
    } else {
      setError("Введенное значение должно содержать минимум 3 символа");
    }
  };

  const onAddButtonClick = () => {
    const updatedList = [
      ...list,
      {
        id: Date.now(),
        value: value,
        date: dateFormat(new Date(), "dd/mm/yyyy h:MM:ss"),
      },
    ];
    setList(updatedList);
    setValue("");
    setError("");
  };

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles["buttons-container"]}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          disabled={value ? false : true}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {list.length > 0 ? (
          <ul className={styles.list}>
            {list.map(({ id, value, date }) => {
              return (
                <li className={styles["list-item"]} key={id}>
                  {value} {date}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        )}
      </div>
    </div>
  );
};
