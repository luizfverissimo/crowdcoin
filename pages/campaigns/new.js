import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiRocket } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

function New() {
  const [minimumValue, setMinimumValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleCreateCampaign(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const res = factory.methods.createCampaign(String(minimumValue)).send({
        from: accounts[0]
      });

      await toast.promise(res, {
        loading: 'Waiting on transaction...',
        success: "🎉 You've created a new campaign!",
        error: 'Something went wrong! Try again. 🙁'
      });

      setIsLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <Head>
        <title>CrowdCoin | Create new campaign</title>
      </Head>
      <main className='flex items-end justify-between w-full'>
        <div>
          <h2 className='mt-8 text-2xl text-left text-primary'>
            + Create new campaign
          </h2>
          <form
            className='flex flex-col items-start w-full gap-4 my-8'
            onSubmit={handleCreateCampaign}
          >
            <div className='form-control'>
              <label htmlFor='value' className='label'>
                <span className='label-text'>Minimum Contribution</span>
              </label>
              <label className='input-group'>
                <span>Wei</span>
                <input
                  id='value'
                  required
                  placeholder='1000000'
                  className='input input-primary input-bordered'
                  type='number'
                  onChange={(e) => setMinimumValue(e.target.value)}
                  value={minimumValue}
                />
              </label>
            </div>
            <button
              type='submit'
              className='gap-2 uppercase btn btn-primary'
              disabled={isLoading}
            >
              Create <BiRocket />
            </button>
          </form>
        </div>
        <img
          src='/new-hero-img.png'
          alt='One person launching a rocket from a pc'
          className='w-[600px]'
        />
      </main>
    </>
  );
}

export default New;
