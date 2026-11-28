import { handleGeo, type Context } from '../../server/handlers';

export const onRequestGet = (context: Context) => handleGeo(context);
