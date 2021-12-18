export function CampaignStatusCard({ header, value, description }) {
  return (
    <div className='shadow stats'>
      <div className='stat'>
        <div className='stat-title'>{header}</div>
        <div className='stat-value'>{value}</div>
        <div className='stat-desc'>{description}</div>
      </div>
    </div>
  );
}