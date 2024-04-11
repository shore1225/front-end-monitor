import log from '../log';
import { routerChange, routerLeave } from './router';

enum PVType {
    PV = 'pv',
    LEAVE = 'leave',
} 

export default function pv() {
    log(PVType.PV);
    routerChange(() => log(PVType.PV));
    routerLeave(() => log(PVType.LEAVE));
}