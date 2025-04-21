import { Application } from '../declarations';
import requestId from './request-id';

export default function (app: Application): void {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(requestId());
}
