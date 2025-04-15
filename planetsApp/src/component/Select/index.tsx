import styles from './select.module.scss'

interface ISelect{
value:  "asc" | "desc";
onChange?: (value: "asc" | "desc") => void;
} 

export const Select = ({value,onChange}:ISelect) => {
  return (
    <div className={styles.selectContent}>
    <select 
    className={styles.select}
    value={value}
    onChange={(e) => onChange?.(e.target.value as "asc" | "desc")}
    >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
    </select>
    </div>
  )
}
