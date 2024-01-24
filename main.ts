import { myEventEmitter } from './eventEmitter';

const emitter1 = myEventEmitter.on('event1', (data) => {
  console.log(data, `from first emitter`);
});

myEventEmitter.emit('event1', { a: '3' });

emitter1();

try {
  myEventEmitter.emit('event1', { a: '3' });
} catch (err: any) {
  console.log(err.message);
}
