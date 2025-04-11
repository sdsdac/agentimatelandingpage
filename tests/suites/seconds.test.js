import {
  expect,
  getChildAtIndex,
} from '../utils.js';

import {
  minValue,
} from '../../src/consts.js';

import {
  animate,
  createTimeline,
  createTimer,
  engine,
} from '../../src/anime.js';


suite('Seconds', () => {

  test('Calls added to a 0 duration timeline with a delay should not fire before the end of the delay duration', resolve => {

    engine.timeUnit = 's';

    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;

    const tl = createTimeline({
      delay: 1,
      loop: 1,
      autoplay: false,
      // onUpdate: self => console.log(self.id, self._currentTime),
      onComplete: self => {
        expect(timer1Log).to.equal(1);
        expect(timer2Log).to.equal(1);
        expect(timer3Log).to.equal(1);
        engine.timeUnit = 'ms';
        resolve();
      }
    })
    .call(() => { timer1Log += 1; }, 0)
    .call(() => { timer2Log += 1; }, 0)
    .call(() => { timer3Log += 1; }, 0)
    .init();

    tl.seek(-.1);

    expect(timer1Log).to.equal(0);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);

    tl.play();

  });

  test('Stretch a timer', () => {

    engine.timeUnit = 's';

    const timer1 = createTimer({
      duration: .1,
      autoplay: false
    });
    expect(timer1.duration).to.equal(.1);
    timer1.stretch(.6);
    expect(timer1.duration).to.equal(.6);
    timer1.stretch(.3);
    expect(timer1.duration).to.equal(.3);
    timer1.stretch(0);
    expect(timer1.duration).to.equal(minValue);
    expect(timer1.iterationDuration).to.equal(minValue);
    timer1.stretch(.3);
    expect(timer1.duration).to.equal(.3);
    expect(timer1.iterationDuration).to.equal(.3);

    engine.timeUnit = 'ms';

  });

  test('Stretch an animation', () => {

    engine.timeUnit = 's';

    const animation1 = animate('#target-id', {
      width: [{to: 100, duration: .1}, {to: 100, duration: .2}],
      duration: .1,
      autoplay: false
    });

    expect(animation1.duration).to.equal(.3);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(.1);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(.2);
    animation1.stretch(.6);
    expect(animation1.duration).to.equal(.6);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(.2);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(.4);
    animation1.stretch(.03);
    expect(animation1.duration).to.equal(.03);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(.01);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(.02);
    animation1.stretch(0);
    expect(animation1.duration).to.equal(minValue);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(minValue);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(minValue);
    animation1.stretch(.03);
    expect(animation1.duration).to.equal(.03);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(.03);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(.03);

    engine.timeUnit = 'ms';

  });

});
