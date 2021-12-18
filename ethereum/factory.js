import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6FE4c42C93339C42A61441C202062192CFFF91CB'
);

export default instance;
