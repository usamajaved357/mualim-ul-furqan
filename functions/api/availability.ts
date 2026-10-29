import { handleAvailability, type Context } from '../../server/handlers';

export const onRequestGet = (context: Context) => handleAvailability(context);
