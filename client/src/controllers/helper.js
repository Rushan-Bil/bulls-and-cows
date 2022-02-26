class Helper {
  debounce(func, handleFunc, delay, timerId, setTimerId) {
    let isReady = false;
    return function wrap() {
      if (isReady) {
        handleFunc();
        isReady = false;
      } else {
        func();
        clearTimeout(timerId);
        setTimerId(setTimeout(() => {
          isReady = true;
          wrap();
        }, delay));
      }
    };
  }

  setCorrectType(type) {
    switch (type) {
      case 'wrong':
        return 'doubt';
      case 'doubt':
        return 'correct';
      case 'correct':
        return 'alphabet';
      case 'alphabet':
        return 'wrong';
      default:
        return 'wrong';
    }
  }
}

export default new Helper();
