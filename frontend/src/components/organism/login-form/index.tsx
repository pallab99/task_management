'use client';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import PasswordInput from '@/components/atoms/password-input';
import UseSignIn from '@/hooks/auth/useLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInMutation } = UseSignIn();

  const onSubmit = async (data: unknown) => {
    signInMutation.mutate(data);
  };
  const router = useRouter();

  useEffect(() => {
    if (signInMutation.isSuccess && !signInMutation.isPending) {
      router.push('/');
    }
  }, [router, signInMutation]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Log in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  fieldValues={field}
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  label="Email"
                  type="email"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
              render={({ field }) => (
                <PasswordInput
                  fieldValues={field}
                  placeholder="Enter Your Password"
                  label="Password"
                />
              )}
            />

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <Button text="Log In" type="submit" />
            <p className="text-sm font-light text-gray-500 ">
              Register Now
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:underline "
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
