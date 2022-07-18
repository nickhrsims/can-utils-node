import { send, dump } from '../can-utils';

describe('send', () => {
    it('runs without crashing', (done) => {
        dump('vcan0', (data, exit) => {
            console.log(data.toString());
            exit();
            done();
        });
        send('vcan0', '000#00');
    });
});
