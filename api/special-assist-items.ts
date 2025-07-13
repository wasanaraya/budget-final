import { handleSpecialAssistItems } from './handlers';
import { requireAuth } from './_middleware';
export default requireAuth(handleSpecialAssistItems);
