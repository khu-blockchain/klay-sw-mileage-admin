import {useMemo} from 'react';

const useIsAble = (deps: Array<boolean>) => {
  return useMemo(() =>
      deps.reduce((acc, cur) => acc && cur, true),
    [...deps])
};

export default useIsAble;
