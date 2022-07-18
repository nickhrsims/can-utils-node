import assert from 'assert';
import { spawn } from 'child_process';

type DataEventHandler = (data: any, exit: () => void) => void;

interface DumpOptions {
    timestamps?: 'absolute' | 'delta' | 'zero' | 'date';
    binary?: boolean;
    ascii?: boolean;
}

const timestampMap = {
    absolute: 'a',
    delta: 'd',
    zero: 'z',
    date: 'A',
};

function constructDumpArgs(options: DumpOptions) {
    const { ascii, binary, timestamps } = options;
    const args = [];
    if (!!ascii) args.push('-a');
    if (!!binary) args.push('-i');
    if (!!timestamps) args.push('-t', timestampMap[timestamps]);
    return args;
}

export async function dump(
    iface: string,
    onData: DataEventHandler,
    options?: DumpOptions
): Promise<void> {
    const args = !!options ? [...constructDumpArgs(options), iface] : [iface];
    const subprocess = spawn('candump', args);

    subprocess.on('exit', (code) => {
        assert(
            code === 0,
            `candump:${subprocess.pid} exited with non-zero status code ${code}`
        );
    });

    const exit = () => subprocess.kill();
    for await (const data of subprocess.stdout) onData(data, exit);
}

export async function send(iface: string, frame: string): Promise<void> {
    const subprocess = spawn('cansend', [iface, frame]);

    subprocess.on('exit', (code) => {
        assert(
            code === 0,
            `cansend:${subprocess.pid} exited with non-zero status code ${code}`
        );
    });

    for await (const data of subprocess.stderr) console.error(data.toString());
}
