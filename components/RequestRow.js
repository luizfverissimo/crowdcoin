import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { getCampaign } from '../ethereum/campaign';
import web3 from '../ethereum/web3';

export function RequestRow({ request, address }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const readyToFinalize = request.approvalCount > request.approversCount / 2;

  async function handleApproveRequest() {
    const campaign = await getCampaign(address);

    const loadingToast = toast.loading('Waiting on transaction...');
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await campaign.methods.approveRequest(request.id).send({
        from: accounts[0]
      });

      toast.dismiss(loadingToast);
      toast.success('🎉 You approved a request!');
      setIsLoading(false);
      setTimeout(() => {
        router.replace(`/campaigns/${address}/requests`);
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.dismiss(loadingToast);
      toast.error('There was an error approving this request.');
    }
  }

  async function handleFinalizeRequest() {
    const campaign = await getCampaign(address);

    const loadingToast = toast.loading('Waiting on transaction...');
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await campaign.methods.finalizeRequest(request.id).send({
        from: accounts[0]
      });

      toast.dismiss(loadingToast);
      toast.success('🎉 You finalized a request!');
      setIsLoading(false);
      setTimeout(() => {
        router.replace(`/campaigns/${address}/requests`);
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.dismiss(loadingToast);
      toast.error('There was an error finalizing this request.');
    }
  }

  return (
    <tr
      className={`hover ${
        request.complete ? 'opacity-40 pointer-events-none' : ''
      } ${readyToFinalize && !request.complete ? 'text-green-500' : ''}`}
    >
      <td>{request.id}</td>
      <td>{request.description}</td>
      <td>{request.value}</td>
      <td>{request.recipient}</td>
      <td>
        {request.approvalCount}/{request.approversCount}
      </td>
      {!request.complete && (
        <>
          <td>
            <button
              type='button'
              className='btn btn-primary btn-sm btn-outline'
              onClick={handleApproveRequest}
              disabled={isLoading}
            >
              Approve ✓
            </button>
          </td>
          {readyToFinalize && (
            <td>
              <button
                disabled={isLoading}
                type='button'
                className='btn btn-warning btn-sm btn-outline'
                onClick={handleFinalizeRequest}
              >
                Finalize ✓
              </button>
            </td>
          )}
        </>
      )}
    </tr>
  );
}
