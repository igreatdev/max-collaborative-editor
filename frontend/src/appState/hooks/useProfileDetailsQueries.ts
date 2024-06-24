import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '../api';
import { PROFILE_URL } from '../constants';
import { ProfileResponse, UserProfile } from '../types/auth';

export const profileDetailsKey = 'profile-details';

export const getProfileDetails = async () => {
  const { data: res }: { data: ProfileResponse } = await api.get(PROFILE_URL);

  return res.data;
};

export const useGetProfileQuery = (config?: any) => {
  return useQuery<UserProfile>({
    queryKey: [profileDetailsKey],
    queryFn: useCallback(() => getProfileDetails(), []),
    ...config,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: true,
  });
};
