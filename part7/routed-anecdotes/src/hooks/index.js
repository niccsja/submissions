import { useState } from 'react';



// modules can have several named exports
export const useAnotherHook = () => {
    // ...
};


export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const clear = () => {
        setValue("")
            console.log('reset was called')
    }

    return {
       
            type,
            value,
            onChange,
            reset:{
                clear
            }
    
    };
};
