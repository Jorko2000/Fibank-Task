import {LogOut,RefreshCw} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {Button} from '@/components/ui/Button'
import {EmptyState} from '@/components/ui/EmptyState'
import {Spinner} from '@/components/ui/Spinner'
import {SWAPI_BASE_URL,LOGIN_ROUTE} from '@/lib/constants'
import {useAuth} from '@/features/auth/useAuth'
import {usePeople} from '@/features/people/usePeople'
import {PeopleTable} from '@/features/people/PeopleTable'
const firstPage=`${SWAPI_BASE_URL}/people/`
export function TablePage(){
 const navigate=useNavigate();const {session,signOut}=useAuth();const {data,loading,error,next,previous,retry}=usePeople(firstPage)
 const logout=()=>{signOut();navigate(LOGIN_ROUTE,{replace:true})}
 return <main className="table-page"><header className="table-header"><div><p className="eyebrow">STAR WARS API</p><h1>People directory</h1><p>Live data from <span className="code">https://swapi.py4e.com/api/people/</span></p></div><div className="header-actions"><span className="session">{session?.username}</span><Button variant="secondary" onClick={logout}><LogOut size={16}/> Sign out</Button></div></header>
 <section className="table-card"><div className="table-card__top"><div><h2>Characters</h2><p>{data?`${data.results.length} records on this page · ${data.count} total`: 'Loading records…'}</p></div><Button variant="secondary" onClick={retry} disabled={loading}><RefreshCw size={16}/> Refresh</Button></div>
 {loading&&!data?<div className="state"><Spinner/><strong>Loading people…</strong><span>Fetching data from SWAPI.</span></div>:error?<EmptyState title="Unable to load data" message={error} action={<Button onClick={retry}>Try again</Button>}/>:data&&data.results.length?<><PeopleTable people={data.results}/><div className="pagination"><span>Use the API's own pagination links.</span><div><Button variant="secondary" onClick={previous} disabled={!data.previous||loading}>Previous</Button><Button onClick={next} disabled={!data.next||loading}>Next</Button></div></div></>:<EmptyState title="No people returned" message="The API returned an empty result set."/>}</section><footer className="footer"><span>React · TypeScript · Vite · RHF · Zod</span><span>Responsive · Accessible · API-driven</span></footer></main>
}
