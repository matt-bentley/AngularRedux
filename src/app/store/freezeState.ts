// used because Redux requires immutability
function deepFreeze(o){
  Object.freeze(o);
  Object.getOwnPropertyNames(o).map((prop) => {
      if(o.hasOwnProperty(prop) 
        && o[prop] != null
        && typeof 0[prop] === 'object'
        && !Object.isFrozen(o[prop])){
          deepFreeze(o[prop]);
        }
  });

  return o;
}

export default function freezeState(store){
    return (next) => (action) => {
        const result = next(action);
        const state = store.getState();
        deepFreeze(state);
        return result;
    }
}