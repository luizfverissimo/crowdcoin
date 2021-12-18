import Link from 'next/link';

export function CampaignCard({ campaign }) {
  return (
    <div className='card text-center shadow-2xl w-full xl:min-w-[600px] xl:w-auto'>
      <div className='card-body'>
        <h2 className='card-title text-ellipsis'>{campaign}</h2>
        <div className='justify-center card-actions'>
          <Link href={`/campaigns/${campaign}`}>
            <a className='btn btn-outline btn-primary'>View Campaign</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
