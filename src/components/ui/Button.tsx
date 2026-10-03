import type {ButtonHTMLAttributes,ReactNode} from 'react'
export function Button({children,variant='primary',fullWidth=false,className='',...props}:{children:ReactNode;variant?:'primary'|'secondary';fullWidth?:boolean}&ButtonHTMLAttributes<HTMLButtonElement>){return <button className={`button button--${variant} ${fullWidth?'button--full':''} ${className}`} {...props}>{children}</button>}
