import {forwardRef,type InputHTMLAttributes} from 'react'
interface Props extends InputHTMLAttributes<HTMLInputElement>{label:string;error?:string}
export const Input=forwardRef<HTMLInputElement,Props>(function Input({label,error,id,...props},ref){const inputId=id||label.toLowerCase().replace(/[^a-z0-9]+/g,'-');return <div className="field"><label htmlFor={inputId}>{label}</label><input ref={ref} id={inputId} className={`input ${error?'input--error':''}`} aria-invalid={Boolean(error)} {...props}/>{error&&<span className="field-error" role="alert">{error}</span>}</div>})
