import style from './Select.module.css'

export default function Select({
  text,
  name,
  options,
  handlerOnChange,
  value,
}) {
  return (
    <div className={style.select_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handlerOnChange}>
        <option>Selecione uma categoria</option>
            {
                options.map((option)=>(
                    <option 
                        value={option.id} 
                        key={option.id}>
                        {option.name}
                    </option>
                ))
            } 
      </select>
    </div>
  )
}
