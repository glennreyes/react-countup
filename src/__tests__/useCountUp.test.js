'use strict';

import React from 'react';
import { render, act } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { useCountUp } from '../index';

afterEach(cleanup);

it('renders countup correctly', async () => {
  const Hook = () => {
    const { countUp } = useCountUp({ end: 10 });
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('10');
        res();
      }, 1100);
    });
  });
});

it('does not start countup when startOnMount is false', async () => {
  const Hook = () => {
    const { countUp } = useCountUp({ end: 10, startOnMount: false });
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('0');
        res();
      }, 1100);
    });
  });
});

it('renders with delay correctly with hook', async () => {
  const Hook = () => {
    const { countUp } = useCountUp({ delay: 1, end: 10 });
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('10');
        res();
      }, 2100);
    });
  });
});

it('calls start correctly with hook', async () => {
  let startFn;
  const onStart = jest.fn();
  const Hook = () => {
    const { countUp, start } = useCountUp({ end: 10, onStart, startOnMount: false });
    startFn = start;
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  act(() => {
    startFn();
  })
  expect(onStart).toHaveBeenCalled();

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('10');
        res();
      }, 1100);
    });
  });
});

it('calls reset correctly with hook', async () => {
  let resetFn;
  const onReset = jest.fn();
  const Hook = () => {
    const { countUp, reset } = useCountUp({ end: 10, onReset });
    resetFn = reset;
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);

  const span = container.firstChild;

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        expect(span.textContent).toEqual('10');
        res();
      }, 1100);
    });
  });

  act(() => {
    resetFn();
  })
  expect(onReset).toHaveBeenCalled();
  expect(span.textContent).toEqual('0');
});

it('calls update correctly with hook', async () => {
  let updateFn;
  const onUpdate = jest.fn();

  const Hook = () => {
    const { countUp, update } = useCountUp({ end: 10, onUpdate });
    updateFn = update;
    return <span onClick={update}>{countUp}</span>;
  };

  const { container } = render(<Hook />);

  const span = container.firstChild;

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        expect(span.textContent).toEqual('10');
        res();
      }, 1100);
    });
  });

  act(() => {
    updateFn(20);
  })
  expect(onUpdate).toHaveBeenCalled();

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        expect(span.textContent).toEqual('20');
        res();
      }, 1100);
    });
  });
});

it('calls pauseResume correctly with hook', async () => {
  let pauseResumeFn;
  const onPauseResume = jest.fn();

  const Hook = () => {
    const { countUp, pauseResume } = useCountUp({ end: 10, onPauseResume });
    pauseResumeFn = pauseResume;
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  const span = container.firstChild;

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        pauseResumeFn();
        expect(onPauseResume).toHaveBeenCalled();
        res();
      }, 400);
    });
  });

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        expect(span.textContent).not.toEqual('10');
        res();
      }, 1100);
    });
  });

  act(() => {
    pauseResumeFn();
  })

  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        expect(span.textContent).toEqual('10');
        res();
      }, 1100);
    });
  });
});
