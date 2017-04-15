import { GetObjectKeyPipe } from './get-object-key.pipe';
const pipe = new GetObjectKeyPipe();
const sampleObject = { usd: { sell: 123, buy: 321 } };
const sampleObject2 = { usd: { sell: 123, buy: 321 }, euro: { sell: 123, buy: 321 } };

describe('GetObjectKeyPipe', () => {

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms one property to single key', () => {
    expect(pipe.transform(sampleObject)).toEqual(['usd']);
  });

  it('transforms two properties to two keys', () => {
    expect(pipe.transform(sampleObject2)).toEqual(['usd', 'euro']);
  });

});
