import { handleBook, type Context } from '../../server/handlers';

export const onRequestPost = (context: Context) => handleBook(context);
