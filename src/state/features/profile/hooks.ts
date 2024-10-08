import { useCallback, useEffect } from "react";
import { useAppDispatch } from "~/state/store";
import { fetchCurrentProfile, setSelectedRole } from ".";
import { useAppSelector } from "~/state/hooks";
import { selectCurrentProfile } from "./selectors";

export const useProfileActions = () => {
  const dispatch = useAppDispatch();
  const currentProfile = useAppSelector(selectCurrentProfile);

  // Fetch the current profile
  useEffect(() => {
    void dispatch(fetchCurrentProfile());
  }, [dispatch]);

  const selectRole = useCallback(
    (roleId: string | number) => {
      dispatch(setSelectedRole(roleId));
    },
    [dispatch],
  );

  return {
    selectRole,
  };
};
