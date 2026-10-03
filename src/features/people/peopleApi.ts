import {SWAPI_BASE_URL} from '@/lib/constants'
import {getJson} from '@/lib/http'
import type {PeopleResponse} from '@/types/swapi'
export function getPeople(url=`${SWAPI_BASE_URL}/people/`,signal?:AbortSignal){return getJson<PeopleResponse>(url,signal)}
