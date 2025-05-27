
export const validateFunctionalForm = (state, setState) => {
    const updatedState = { ...state };
    let status = true;

    Object.keys(updatedState).forEach(key => {
        const field = updatedState[key];

        if (field.isRequired) {
            const value = field?.value;

            if (value === undefined || value === null) {
                updatedState[key] = { ...field, error: 'This field is required' };
                status = false;
            } else if (typeof value === 'string' && value.trim() === '') {
                updatedState[key] = { ...field, error: 'This field is required' };
                status = false;
            } else if (Array.isArray(value) && value.length === 0) {
                updatedState[key] = { ...field, error: 'This field is required' };
                status = false;
            } else {
                updatedState[key] = { ...field, error: '' };
            }
        } else {
            updatedState[key] = { ...field, error: '' };
        }
    });

    setState(updatedState);
    return status;
};


export const removeSessionStorage = (keyName) => {
    sessionStorage.removeItem(keyName);
  }
  
  export const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
  }
  
  export const getSessionStorage = (keyName) => {
    const item = sessionStorage.getItem(keyName);
    return item;
  }
  
  export const removeAllSessionStorage = () => {
    sessionStorage.clear();
  }
  