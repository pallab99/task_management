//@ts-nocheck
'use client';
import authApi from '@/api/authApi';
// import { ICustomAxiosError } from '@/app/types/axios';
// import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
// import { AxiosResponse } from 'axios';
// import { useRouter } from 'next/router';

const UseSignIn = () => {
  const signInMutation = useMutation({
    mutationFn: (data: unknown) => {
      return authApi.signIn(data);
    },
    // onSuccess: (res: AxiosResponse) => {
    //   toast({
    //     description: res?.data?.message,
    //   });
    // },
    // onError: (error: ICustomAxiosError) => {
    //   toast({
    //     variant: 'destructive',
    //     description: error?.response?.message,
    //   });
    // },
  });
  return { signInMutation };
};

export default UseSignIn;
