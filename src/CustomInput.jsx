import React from 'react'


const CustomInput = (props) => {
    const {type, label, _id,_class,name,val,onCh,onBl} =props;
  return (
    <div>
       
            <label className="block" htmlFor={label}>
            <span className="block text-sm font-medium mb-2 text-slate-700">{label}</span>
            
            <input type={type}
             className={`peer w-full p-3 border-black border ${{_class}}`}
             id={_id}
             placeholder={label}
             name={name}
             value={val}
             onChange={onCh}
             onBlur={onCh}
             />
            </label>
        
    </div>
  )
}

export default CustomInput
