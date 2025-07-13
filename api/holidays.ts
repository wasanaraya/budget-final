import { handleHolidays } from './handlers';
import { requireAuth } from './_middleware';
export default requireAuth(handleHolidays);
