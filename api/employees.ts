import { handleEmployees } from './handlers';
import { requireAuth } from './_middleware';
export default requireAuth(handleEmployees);
