class This {
  get(key) {
    if (!key) {
      return null;
    }
    try {
      const valueStr = localStorage.getItem(key);
      if (valueStr) {
        return valueStr;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  set(key, obj) {
    if (!key) {
      console.error("Error: Key is missing");
    }
    try {
      localStorage.setItem(key, obj);
      return null;
    } catch (err) {
      console.error(err);
    }
  }

  clear(key) {
    if (!key) {
      console.error("Error: Key is missing");
    }
    try {
      localStorage.removeItem(key);
      return null;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new This();
