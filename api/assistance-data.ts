import { handleAssistanceData } from './handlers';
import { requireAuth } from './_middleware';
export default requireAuth(handleAssistanceData);
