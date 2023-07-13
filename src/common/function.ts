export const compose = (...fns: Array<(Function)>) => (arg: any) => 
  fns.reduce((compose, f) => f(compose), arg);