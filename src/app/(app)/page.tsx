import { CPFSearch } from './components/cpf-search'
import { UserNotice } from './components/cpf-search/user-notice'

export default function Home() {
  return (
    <div className="relative flex h-screen w-full min-w-screen-sm flex-col items-center justify-center gap-10">
      <CPFSearch />
      <UserNotice />
    </div>
  )
}
