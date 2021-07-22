import { useEffect, useLayoutEffect } from 'react';

/**
 * Silence SSR Warnings.
 * Borrowed from Formik v2.1.1, Licensed MIT.
 *
 * https://github.com/formium/formik/blob/9316a864478f8fcd4fa99a0735b1d37afdf507dc/LICENSE
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;
