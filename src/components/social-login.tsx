import React from 'react'
import GoogleLogin from './google-login'
import GithubLogin from './github-login'

export function SocialLogin() {
  return (
    <>
      <GoogleLogin />
      <GithubLogin />
    </>
  )
}
