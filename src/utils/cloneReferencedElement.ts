import * as React from 'react';

export const cloneReferencedElement = (
  element: any,
  config: any,
  ...children: any
) => {
  let $original = element.ref;
  let $clone = config.ref;

  if ($original === null || $clone === null) {
    return React.cloneElement(element, config, ...children);
  }

  if (typeof $original !== 'function') {
    return React.cloneElement(element, config, ...children);
  }

  return React.cloneElement(
    element,
    {
      ...config,
      ref(component: any) {
        $clone(component);
        $original(component);
      },
    },
    ...children,
  );
};
