/* ─── Welcome popup gate ───
   Shared between VideoPopup and anything that should wait for it (the hero
   intro animation plays behind the popup otherwise, unseen). Decided once
   per page load, before any component renders, so render order doesn't matter.
*/
const SEEN_KEY = 'metrio-tribute-video-seen';

const hasSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

export const markPopupSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* Storage blocked — popup may show again, which is harmless */
  }
};

let open = !hasSeen();
const listeners = new Set();

export const isPopupOpen = () => open;

export const closePopup = () => {
  open = false;
  listeners.forEach((fn) => fn());
};

/* Returns an unsubscribe function, so it can be returned from useEffect */
export const onPopupClosed = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
