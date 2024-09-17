import moment from 'moment';

export class EntityManager {
    protected db_timestamp: string = moment().format('YYYY-MM-DD HH:mm:ss');
}
