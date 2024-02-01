import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      // The event listener is being added everytime the component renders
      // this is not ideal, it will endup adding many same event to DOM ele
      // to prevent this use React CleanUP function
      document.addEventListener('keydown', callback);

      // Cleanup function remove the event listener from DOM ele
      return function () {
        document.removeEventListener('keydown', callback);
      };
    },

    [key, action]
  );
}
