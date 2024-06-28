import React from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

export default function SubmitPost() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={`${pending && 'bg-gray-300'}`}
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Send'}
    </Button>
  );
}
