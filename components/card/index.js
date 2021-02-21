import Image from 'next/image'
import Link from 'next/link'

const Card = () => {
  return (
    <div className="bg-blue-500 dark:bg-red-500">
      <Image src="/images/galaxy_vbrntm.jpg" width={100} height={100} alt="Galaxy"/>
      <Link href="/home">Home</Link>
    </div>
  )
}

export default Card