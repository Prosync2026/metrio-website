import { useLocation, useNavigate } from 'react-router-dom';

/* "Back to …" links on detail pages.
   Cards that open a detail page pass `state={{ from: pathname }}`. When the
   visitor came from one of the pages in `labels`, the link steps back in
   history so they land where they left off (ScrollManager restores the
   position). Otherwise it follows its normal `to` and shows labels.default. */
const useBackLink = (labels) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const from = state?.from;
  const known = from !== undefined && from !== 'default' && from in labels;

  return {
    label: known ? labels[from] : labels.default,
    onClick: (e) => {
      if (!known) return;
      e.preventDefault();
      navigate(-1);
    },
  };
};

export default useBackLink;
