'use client';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import PasswordInput from '@/components/atoms/password-input';
import UseSignUp from '@/hooks/auth/useRegister';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const SignupForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUpMutation } = UseSignUp();

  const onSubmit = async (data: unknown) => {
    console.log('signup form data', data);
    signUpMutation.mutate(data);
  };
  const router = useRouter();

  //   useEffect(() => {
  //     if (signUpMutation.isSuccess && !signUpMutation.isPending) {
  //       router.push('/login');
  //     }
  //   }, [router, signUpMutation]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Register your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  fieldValues={field}
                  name="userName"
                  id="userName"
                  placeholder="Enter Your UserName"
                  label="UserName"
                  type="text"
                />
              )}
            />

            {errors.username && <p>{errors.username.message}</p>}

            <Controller
              name="email"
              control={control}
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
            {errors.email && <p>{errors.email.message}</p>}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  fieldValues={field}
                  placeholder="Enter Your Password"
                  label="Password"
                />
              )}
            />

            {errors.password && <p>{errors.password.message}</p>}

            <Button text="Sign Up" type="submit" />
            <p className="text-sm font-light text-gray-500 ">
              Already Have Account
              <Link
                href="/login"
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

export default SignupForm;
