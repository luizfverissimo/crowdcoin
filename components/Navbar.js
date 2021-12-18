import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

export function Navbar({ children }) {
  return (
    <>
      <nav className='flex items-center justify-between w-full px-6 py-6 mx-auto max-w-7xl xl:px-0'>
        <Link href='/'>
          <a className='text-4xl font-bold transition-all text-primary hover:text-primary-focus'>
            CrowdCoin
          </a>
        </Link>
        <div className='flex items-center gap-4'>
          <Link href='/'>
            <a title='List all Campaigns available' className='btn btn-primary'>
              Campaigns
            </a>
          </Link>
          <Link href='/campaigns/new'>
            <a
              title='Add new Campaign'
              className='font-bold btn btn-outline btn-circle btn-primary'
            >
              <BiPlus />
            </a>
          </Link>
        </div>
      </nav>
      <div className='flex flex-col items-center w-full px-6 mx-auto max-w-7xl xl:px-0'>
        {children}
      </div>
    </>
  );
}
