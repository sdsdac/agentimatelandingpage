import {
  expect,
} from '../utils.js';

import {
  waapi,
  utils,
  stagger,
  eases,
} from '../../src/anime.js';

suite('WAAPI', () => {

  test('Animate multiple elements', resolve => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: 10,
      onComplete: anim => {
        expect(anim.duration).to.equal(10);
        expect(utils.get(targets[0], 'x')).to.equal('100px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('100px');
        expect(utils.get(targets[3], 'x')).to.equal('100px');
        resolve();
      },
    });
  });

  test('Animate multiple elements with stagger', resolve => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: 10,
      delay: stagger(1),
      onComplete: anim => {
        expect(anim.duration).to.equal(13);
        expect(utils.get(targets[0], 'x')).to.equal('100px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('100px');
        expect(utils.get(targets[3], 'x')).to.equal('100px');
        resolve();
      },
    });
  });

  test('Animate with function based values', resolve => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: (_, i) => `translateX(${i * 100}px)`,
      duration: 10,
      delay: stagger(1),
      onComplete: anim => {
        expect(utils.get(targets[0], 'x')).to.equal('0px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('200px');
        expect(utils.get(targets[3], 'x')).to.equal('300px');
        resolve();
      },
    });
  });

  test('Animate with function based keyframes value', resolve => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: ['translateX(200px)', (_, i) => `translateX(${i * 100}px)`],
      duration: 10,
      delay: stagger(1),
      onComplete: anim => {
        expect(utils.get(targets[0], 'x')).to.equal('0px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('200px');
        expect(utils.get(targets[3], 'x')).to.equal('300px');
        resolve();
      },
    });
  });

  test('Seek an animation', () => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: 10,
      autoplay: false,
      ease: 'linear',
    });
    expect(animation.currentTime).to.equal(0);
    animation.seek(5).commitStyles();
    expect(utils.get(targets[0], 'x')).to.equal('50px');
    expect(animation.currentTime).to.equal(5);
    animation.seek(animation.duration).commitStyles();
    expect(animation.currentTime).to.equal(animation.duration);
    expect(utils.get(targets[0], 'x')).to.equal('100px');
  });

  test('Set and get progress on an animation', () => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: 10,
      autoplay: false,
      ease: 'linear',
    });
    expect(animation.progress).to.equal(0);
    animation.progress = .5;
    animation.commitStyles();
    expect(utils.get(targets[0], 'x')).to.equal('50px');
    expect(animation.progress).to.equal(.5);
    animation.progress = 1;
    animation.commitStyles();
    expect(utils.get(targets[0], 'x')).to.equal('100px');
  });

  test('Individual transforms', resolve => {
    const target = utils.$('#target-id');
    const animation = waapi.animate(target, {
      x: 100,
      y: 200,
      rotate: 45,
      scale: 2,
      duration: 10,
      ease: 'linear',
      onComplete: anim => {
        expect(anim.duration).to.equal(10);
        expect(utils.get(target, '--translateX')).to.equal('100px');
        expect(utils.get(target, '--translateY')).to.equal('200px');
        expect(utils.get(target, '--rotate')).to.equal('45deg');
        expect(utils.get(target, '--scale')).to.equal('2');
        resolve();
      },
    });
  });

  test('revert() an animation', resolve => {
    const targets = utils.$('.target-class');
    utils.set(targets, {
      backgroundColor: '#FF0000',
      opacity: .5,
    });
    const animation = waapi.animate(targets, {
      opacity: 1,
      backgroundColor: '#0000FF',
      x: 100,
      y: 200,
      rotate: 45,
      scale: 2,
      duration: 10,
      ease: 'linear',
      onComplete: () => {
        targets.forEach($el => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'backgroundColor')).to.equal('rgb(0, 0, 255)');
        });
        animation.revert();
        targets.forEach($el => {
          expect(utils.get($el, 'opacity')).to.equal('0.5');
          expect(utils.get($el, 'backgroundColor')).to.equal('rgb(255, 0, 0)');
          expect(utils.get($el, '--translateX')).to.equal('0px');
          expect(utils.get($el, '--translateY')).to.equal('0px');
          expect(utils.get($el, '--rotate')).to.equal('0deg');
          expect(utils.get($el, '--scale')).to.equal('1');
        });
        resolve();
      },
    });
  });

  test('utils.remove() a single target', resolve => {
    const targets = utils.$('.target-class');
    waapi.animate(targets, {
      opacity: .5,
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal(!i ? '1' : '0.5');
        });
        resolve();
      },
    });

    utils.remove(targets[0]);
  });

  test('utils.remove() on a specific animation', resolve => {
    const targets = utils.$('.target-class');
    const anim1 = waapi.animate(targets, {
      opacity: .5,
      duration: 10,
    });
    waapi.animate(targets, {
      width: ['0px', '100px'],
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'width')).to.equal('100px');
        });
        resolve();
      },
    });

    utils.remove(targets, anim1);
  });

  test('utils.remove() on a specific property', resolve => {
    const targets = utils.$('.target-class');
    const anim1 = waapi.animate(targets, {
      opacity: .5,
      duration: 10,
    });
    waapi.animate(targets, {
      width: ['0px', '100px'],
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'width')).to.equal('100px');
        });
        resolve();
      },
    });

    utils.remove(targets, null, 'opacity');
  });

  test('utils.remove() on a specific animation and property', resolve => {
    const targets = utils.$('.target-class');
    const anim1 = waapi.animate(targets, {
      opacity: .5,
      height: ['0px', '200px'],
      duration: 10,
    });
    waapi.animate(targets, {
      width: ['0px', '100px'],
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'height')).to.equal('200px');
          expect(utils.get($el, 'width')).to.equal('100px');
        });
        resolve();
      },
    });

    utils.remove(targets, null, 'opacity');
  });

});
