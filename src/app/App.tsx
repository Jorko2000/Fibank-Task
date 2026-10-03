import {Navigate,Route,Routes} from 'react-router-dom'
import {ProtectedRoute} from './ProtectedRoute'
import {LoginPage} from '@/pages/LoginPage'
import {TablePage} from '@/pages/TablePage'
export function App(){return <Routes><Route path="/" element={<LoginPage/>}/><Route element={<ProtectedRoute/>}><Route path="/table" element={<TablePage/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
