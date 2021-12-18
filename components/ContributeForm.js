import { useState } from 'react';
import { BiRocket } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

import web3 from '../ethereum/web3';
import { getCampaign } from '../ethereum/campaign';

export function ContributeForm({ address }) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleContribute(event) {
    event.preventDefault();
    setIsLoading(true);

    const campaign = await getCampaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      const res = campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value.toString(), 'ether')
      });

      await toast.promise(res, {
        loading: 'Waiting on transaction...',
        success:
          "🎉 You've contributed to this project, now you are an approver!",
        error: 'Something went wrong! Try again. 🙁'
      });

      setIsLoading(false);
      setTimeout(() => {
        router.replace(`/campaigns/${address}`);
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col'>
      <Toaster />
      <form
        className='flex flex-col items-start w-full gap-4'
        onSubmit={handleContribute}
      >
        <h3 className='mt-6 text-2xl text-primary'>Contribute</h3>
        <p className='max-w-xs'>
          Become a supporter of this project, you and other supporters can
          control the usage of the money by approving the spending requests.
        </p>
        <div className='form-control'>
          <label htmlFor='value' className='label'>
            <span className='label-text'>Contribution</span>
          </label>
          <label className='input-group'>
            <span>Ether</span>
            <input
              id='value'
              required
              step={0.01}
              placeholder='1.0'
              className='input input-primary input-bordered'
              type='number'
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </label>
        </div>
        <button
          type='submit'
          className='gap-2 uppercase btn btn-primary'
          disabled={isLoading}
        >
          Contribute! <BiRocket />
        </button>
      </form>
    </div>
  );
}
