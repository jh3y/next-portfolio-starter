import dynamic from 'next/dynamic'
const CMS_CONFIG = {}
const Loading = () => <p className="text-green-500">Loading...</p>

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then((CMS) => {
      CMS.init({ CMS_CONFIG })
    }),
  { ssr: false, loading: Loading }
)

const Admin = () => {
  return <CMS />
}
export default Admin
