import { useCallback, useEffect } from "react";
import { useAppDispatch } from "~/state/store";
import { fetchCurrentProfile, setSelectedRole } from ".";

export const useProfileActions = () => {
  const dispatch = useAppDispatch();

  // Fetch the current profile
  useEffect(() => {
    void dispatch(fetchCurrentProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectRole = useCallback(
    (roleId: string) => {
      dispatch(setSelectedRole(roleId));
    },
    [dispatch],
  );

  return {
    selectRole,
  };
};
