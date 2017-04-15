import { GetObjectKeyPipe } from './get-object-key.pipe';
const pipe = new GetObjectKeyPipe();
const smapleObject = { usd: { sell: 123, buy: 321 } };

describe('GetObjectKeyPipe', () => {

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms one property to single key', () => {
    expect(pipe.transform(smapleObject)).toBe('usd');
  });

});
