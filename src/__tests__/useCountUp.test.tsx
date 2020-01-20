'use strict';

import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { useCountUp } from '../index';

afterEach(cleanup);

it('renders countup correctly', async done => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    //@ts-ignore
    useCountUp({ end: 10, ref: countUpRef, startOnMount: true });
    return <span ref={countUpRef} />;
  };

  const { container } = render(<Hook />);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).toEqual('10');
        done();
      }, 1100);
    });
  });
});

it('does not start countup when startOnMount is false', async done => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    //@ts-ignore
    useCountUp({ end: 10, ref: countUpRef, startOnMount: false });
    return <span ref={countUpRef} />;
  };

  const { container } = render(<Hook />);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).toEqual('');
        done();
      }, 1100);
    });
  });
});

it('renders with delay correctly with hook', async done => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    //@ts-ignore
    useCountUp({ end: 10, ref: countUpRef, startOnMount: true, delay: 1 });
    return <span ref={countUpRef} />;
  };

  const { container } = render(<Hook />);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).not.toEqual('10');
        done();
      }, 1100);
    });
  });

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).toEqual('10');
        done();
      }, 2100);
    });
  });
});

// it('calls start correctly with hook', () => {
//   const spy = {};
//   const Hook = () => {
//     const { countUp, start } = useCountUp({ end: 10 });
//     spy.start = start;
//     spyOn(spy, 'start');
//     return <span onClick={spy.start}>{countUp}</span>;
//   };
//
//   const { container } = render(<Hook />);
//   fireEvent.click(container.firstChild);
//   expect(spy.start).toHaveBeenCalled();
// });
//
// it('calls reset correctly with hook', () => {
//   const spy = {};
//   const Hook = () => {
//     const { countUp, reset } = useCountUp({ end: 10 });
//     spy.reset = reset;
//     spyOn(spy, 'reset');
//     return <span onClick={spy.reset}>{countUp}</span>;
//   };
//
//   const { container } = render(<Hook />);
//   fireEvent.click(container.firstChild);
//   expect(spy.reset).toHaveBeenCalled();
// });
//
// it('calls update correctly with hook', () => {
//   const spy = {};
//
//   const Hook = () => {
//     const onUpdate = jest.fn();
//     const { countUp, update } = useCountUp({ end: 10, onUpdate });
//     spy.onUpdate = onUpdate;
//     return <span onClick={update}>{countUp}</span>;
//   };
//
//   const { container } = render(<Hook />);
//   fireEvent.click(container.firstChild);
//   expect(spy.onUpdate).toHaveBeenCalled();
// });
//
// it('calls pauseResume correctly with hook', () => {
//   const spy = {};
//
//   const Hook = () => {
//     const onPauseResume = jest.fn();
//     const { countUp, pauseResume } = useCountUp({ end: 10, onPauseResume });
//     spy.onPauseResume = onPauseResume;
//     return <span onClick={pauseResume}>{countUp}</span>;
//   };
//
//   const { container } = render(<Hook />);
//   fireEvent.click(container.firstChild);
//   expect(spy.onPauseResume).toHaveBeenCalled();
// });
//
// it('calls start correctly with hook', async done => {
//   const spy = {};
//   const onStart = jest.fn();
//   const Hook = () => {
//     spy.onStart = onStart;
//     spyOn(spy, 'onStart');
//     const { countUp, start } = useCountUp({
//       end: 10,
//       onStart,
//       startOnMount: false,
//     });
//     return <span onClick={start}>{countUp}</span>;
//   };
//
//   const { container } = render(<Hook />);
//
//   fireEvent.click(container.firstChild);
//
//   await act(() => {
//     return new Promise(() => {
//       setTimeout(() => {
//         done();
//       }, 1100);
//     });
//   });
//
//   expect(spy.onStart).toHaveBeenCalled();
// });
