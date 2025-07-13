import { handleMasterRates } from './handlers';
import { requireAuth } from './_middleware';
export default requireAuth(handleMasterRates);
